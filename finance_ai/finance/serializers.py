from rest_framework import serializers

from .models import (
    Transaction,
    Goal,
    Budget
)


# TRANSACTION SERIALIZER
class TransactionSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Transaction

        fields = "__all__"

        read_only_fields = ["user"]


# GOAL SERIALIZER
class GoalSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Goal

        fields = "__all__"

        read_only_fields = ["user"]


# BUDGET SERIALIZER
class BudgetSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Budget

        fields = "__all__"

        read_only_fields = ["user"]