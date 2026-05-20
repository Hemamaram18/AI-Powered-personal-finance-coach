from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import (
    Response
)

from django.db.models import Sum

from django.core.mail import send_mail

from django.conf import settings

from .models import (
    Transaction,
    Goal,
    Budget
)

from .serializers import (
    TransactionSerializer,
    GoalSerializer,
    BudgetSerializer
)


# DASHBOARD
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard(request):

    transactions = Transaction.objects.filter(
        user=request.user
    )

    total_income = sum(
        transaction.amount
        for transaction in transactions
        if transaction.type == "Income"
    )

    total_expense = sum(
        transaction.amount
        for transaction in transactions
        if transaction.type == "Expense"
    )

    balance = (
        total_income - total_expense
    )

    total_transactions = (
        transactions.count()
    )

    return Response({

        "total_income":
        total_income,

        "total_expense":
        total_expense,

        "balance":
        balance,

        "total_transactions":
        total_transactions,

    })


# TRANSACTIONS
# TRANSACTIONS
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def transactions(request):

    # GET ALL TRANSACTIONS
    if request.method == "GET":

        transactions_data = (
            Transaction.objects.filter(
                user=request.user
            ).order_by("-id")
        )

        serializer = TransactionSerializer(
            transactions_data,
            many=True
        )

        return Response(
            serializer.data
        )

    # ADD TRANSACTION
    elif request.method == "POST":

        serializer = TransactionSerializer(
            data=request.data
        )

        if serializer.is_valid():

            new_transaction = serializer.save(
                user=request.user
            )

            # EMAIL ALERT FOR HIGH EXPENSE
            if (
                new_transaction.type == "Expense"
                and new_transaction.amount >= 5000
            ):

                try:

                    send_mail(

                        "Expense Alert",

                        (
                            f"Hello {request.user.username},\n\n"
                            f"You added a high expense of ₹{new_transaction.amount} "
                            f"for {new_transaction.category}.\n\n"
                            "Please manage your spending carefully."
                        ),

                        settings.EMAIL_HOST_USER,

                        ["hemamaram703@gmail.com"],

                        fail_silently=False

                    )

                    print(
                        "EMAIL SENT SUCCESSFULLY"
                    )

                except Exception as e:

                    print(
                        "EMAIL ERROR:",
                        e
                    )

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


# UPDATE TRANSACTION
@api_view(["PATCH", "PUT"])
@permission_classes([IsAuthenticated])
def update_transaction(request, pk):

    try:

        transaction = Transaction.objects.get(
            id=pk,
            user=request.user
        )

    except Transaction.DoesNotExist:

        return Response({

            "error":
            "Transaction Not Found"

        }, status=404)

    serializer = TransactionSerializer(
        transaction,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


# DELETE TRANSACTION
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_transaction(request, pk):

    try:

        transaction = Transaction.objects.get(
            id=pk,
            user=request.user
        )

        transaction.delete()

        return Response({

            "message":
            "Transaction Deleted"

        })

    except Transaction.DoesNotExist:

        return Response({

            "error":
            "Transaction Not Found"

        }, status=404)


# AI RECOMMENDATION
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def ai_recommendation(request):

    transactions = Transaction.objects.filter(
        user=request.user
    )

    total_income = sum(
        transaction.amount
        for transaction in transactions
        if transaction.type == "Income"
    )

    total_expense = sum(
        transaction.amount
        for transaction in transactions
        if transaction.type == "Expense"
    )

    balance = (
        total_income - total_expense
    )

    recommendation = (
        f"Income: ₹{total_income}, "
        f"Expense: ₹{total_expense}, "
        f"Balance: ₹{balance}. "
        "Manage your expenses wisely."
    )

    return Response({

        "recommendation":
        recommendation

    })


# CHART DATA
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def chart_data(request):

    transactions = (
        Transaction.objects.filter(
            user=request.user
        )
    )

    grouped_data = {}

    for item in transactions:

        if item.type == "Expense":

            if item.category in grouped_data:

                grouped_data[
                    item.category
                ] += float(item.amount)

            else:

                grouped_data[
                    item.category
                ] = float(item.amount)

    chart = []

    for category, amount in (
        grouped_data.items()
    ):

        chart.append({

            "category":
            category,

            "amount":
            amount

        })

    return Response(chart)


# GOALS
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def goals(request):

    if request.method == "GET":

        goals_data = Goal.objects.filter(
            user=request.user
        ).order_by("-id")

        serializer = GoalSerializer(
            goals_data,
            many=True
        )

        return Response(
            serializer.data
        )

    elif request.method == "POST":

        serializer = GoalSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


# UPDATE GOAL
@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_goal(request, pk):

    try:

        goal = Goal.objects.get(
            id=pk,
            user=request.user
        )

    except Goal.DoesNotExist:

        return Response({

            "error":
            "Goal Not Found"

        }, status=404)

    serializer = GoalSerializer(
        goal,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


# DELETE GOAL
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_goal(request, pk):

    try:

        goal = Goal.objects.get(
            id=pk,
            user=request.user
        )

        goal.delete()

        return Response({

            "message":
            "Goal Deleted"

        })

    except Goal.DoesNotExist:

        return Response({

            "error":
            "Goal Not Found"

        }, status=404)


# BUDGETS
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def budgets(request):

    if request.method == "GET":

        budgets_data = Budget.objects.filter(
            user=request.user
        ).order_by("-id")

        serializer = BudgetSerializer(
            budgets_data,
            many=True
        )

        return Response(
            serializer.data
        )

    elif request.method == "POST":

        serializer = BudgetSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


# UPDATE BUDGET
@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_budget(request, pk):

    try:

        budget = Budget.objects.get(
            id=pk,
            user=request.user
        )

    except Budget.DoesNotExist:

        return Response({

            "error":
            "Budget Not Found"

        }, status=404)

    serializer = BudgetSerializer(
        budget,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


# DELETE BUDGET
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_budget(request, pk):

    try:

        budget = Budget.objects.get(
            id=pk,
            user=request.user
        )

        budget.delete()

        return Response({

            "message":
            "Budget Deleted"

        })

    except Budget.DoesNotExist:

        return Response({

            "error":
            "Budget Not Found"

        }, status=404)


# BUDGET ANALYTICS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def budget_analytics(request):

    budgets = Budget.objects.filter(
        user=request.user
    )

    results = []

    for budget in budgets:

        spent = (

            Transaction.objects.filter(
                user=request.user,
                category=budget.category,
                type="Expense"
            ).aggregate(
                Sum("amount")
            )["amount__sum"]

            or 0

        )

        remaining = (
            budget.monthly_limit - spent
        )

        results.append({

            "id": budget.id,

            "category": budget.category,

            "budget": budget.monthly_limit,

            "spent": spent,

            "remaining": remaining,

            "month": budget.month

        })

    return Response(results)


# NOTIFICATIONS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def notifications(request):

    transactions = Transaction.objects.filter(
        user=request.user
    )

    total_expense = sum(
        transaction.amount
        for transaction in transactions
        if transaction.type == "Expense"
    )

    messages = []

    if total_expense > 10000:

        messages.append({

            "message":
            "Warning: Spending is high."

        })

    else:

        messages.append({

            "message":
            "Spending looks healthy."

        })

    return Response(messages)


# SPENDING PREDICTION
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def spending_prediction(request):

    transactions = Transaction.objects.filter(
        user=request.user,
        type="Expense"
    )

    total_spending = (
        transactions.aggregate(
            Sum("amount")
        )["amount__sum"] or 0
    )

    total_transactions = (
        transactions.count()
    )

    if total_transactions > 0:

        average_spending = (
            total_spending /
            total_transactions
        )

        predicted_monthly = (
            average_spending * 30
        )

    else:

        predicted_monthly = 0

    return Response({

        "predicted_spending":
        round(predicted_monthly, 2)

    })


# CATEGORY ANALYTICS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def category_analytics(request):

    transactions = Transaction.objects.filter(
        user=request.user,
        type="Expense"
    )

    category_totals = {}

    for item in transactions:

        if item.category in category_totals:

            category_totals[
                item.category
            ] += float(item.amount)

        else:

            category_totals[
                item.category
            ] = float(item.amount)

    if category_totals:

        highest_category = max(
            category_totals,
            key=category_totals.get
        )

        lowest_category = min(
            category_totals,
            key=category_totals.get
        )

    else:

        highest_category = "No Data"
        lowest_category = "No Data"

    return Response({

        "highest_spending_category":
        highest_category,

        "lowest_spending_category":
        lowest_category,

        "category_totals":
        category_totals

    })


# RECENT ACTIVITY
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recent_activity(request):

    recent_transactions = (
        Transaction.objects.filter(
            user=request.user
        ).order_by("-id")[:5]
    )

    serializer = TransactionSerializer(
        recent_transactions,
        many=True
    )

    return Response(
        serializer.data
    )


# MONTHLY TRENDS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def monthly_trends(request):

    transactions = Transaction.objects.filter(
        user=request.user,
        type="Expense"
    )

    monthly_data = {}

    for item in transactions:

        month = item.date.strftime("%B")

        if month in monthly_data:

            monthly_data[month] += float(
                item.amount
            )

        else:

            monthly_data[month] = float(
                item.amount
            )

    results = []

    for month, amount in (
        monthly_data.items()
    ):

        results.append({

            "month": month,

            "amount": amount

        })

    return Response(results)