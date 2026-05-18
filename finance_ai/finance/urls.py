from django.urls import path

from .views import (
    dashboard,
    transactions,
    update_transaction,
    delete_transaction,
    ai_recommendation,
    chart_data,
    goals,
    update_goal,
    delete_goal,
    budgets,
    update_budget,
    delete_budget,
    budget_analytics,
    notifications,
    spending_prediction,
    category_analytics,
    recent_activity,
    monthly_trends,
)

urlpatterns = [

    # DASHBOARD
    path(
        "dashboard/",
        dashboard
    ),

    # TRANSACTIONS
    path(
        "transactions/",
        transactions
    ),

    path(
        "transactions/update/<int:pk>/",
        update_transaction
    ),

    path(
        "transactions/delete/<int:pk>/",
        delete_transaction
    ),

    # AI
    path(
        "ai-recommendation/",
        ai_recommendation
    ),

    # CHART
    path(
        "chart-data/",
        chart_data
    ),

    # GOALS
    path(
        "goals/",
        goals
    ),

    path(
        "goals/update/<int:pk>/",
        update_goal
    ),

    path(
        "goals/delete/<int:pk>/",
        delete_goal
    ),

    # BUDGETS
    path(
        "budgets/",
        budgets
    ),

    path(
        "budgets/update/<int:pk>/",
        update_budget
    ),

    path(
        "budgets/delete/<int:pk>/",
        delete_budget
    ),

    # BUDGET ANALYTICS
    path(
        "budget-analytics/",
        budget_analytics
    ),

    # NOTIFICATIONS
    path(
        "notifications/",
        notifications
    ),

    # SPENDING PREDICTION
    path(
        "spending-prediction/",
        spending_prediction
    ),

    # CATEGORY ANALYTICS
    path(
        "category-analytics/",
        category_analytics
    ),

    # RECENT ACTIVITY
    path(
        "recent-activity/",
        recent_activity
    ),

    # MONTHLY TRENDS
    path(
        "monthly-trends/",
        monthly_trends
    ),

]