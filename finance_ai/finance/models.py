from django.db import models

from django.contrib.auth.models import User


# TRANSACTION MODEL
class Transaction(models.Model):

    CATEGORY_CHOICES = [

        ('Food', 'Food'),

        ('Travel', 'Travel'),

        ('Shopping', 'Shopping'),

        ('Bills', 'Bills'),

        ('Entertainment', 'Entertainment'),

        ('Health', 'Health'),

        ('Education', 'Education'),

        ('Other', 'Other'),

    ]

    # TRANSACTION TYPE
    TYPE_CHOICES = [

        ('Income', 'Income'),

        ('Expense', 'Expense'),

    ]

    # RECURRING TYPES
    RECURRING_CHOICES = [

        ('Daily', 'Daily'),

        ('Weekly', 'Weekly'),

        ('Monthly', 'Monthly'),

        ('Yearly', 'Yearly'),

    ]

    # USER
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    merchant = models.CharField(
        max_length=200
    )

    amount = models.FloatField()

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default='Expense'
    )

    # NEW RECURRING FIELDS
    is_recurring = models.BooleanField(
        default=False
    )

    recurring_type = models.CharField(
        max_length=20,
        choices=RECURRING_CHOICES,
        blank=True,
        null=True
    )

    date = models.DateField()

    description = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.user.username} "
            f"- {self.merchant}"
        )


# GOAL MODEL
class Goal(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    goal_name = models.CharField(
        max_length=200
    )

    target_amount = models.FloatField()

    saved_amount = models.FloatField(
        default=0
    )

    months = models.IntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.user.username} "
            f"- {self.goal_name}"
        )


# BUDGET MODEL
class Budget(models.Model):

    CATEGORY_CHOICES = [

        ('Food', 'Food'),

        ('Travel', 'Travel'),

        ('Shopping', 'Shopping'),

        ('Bills', 'Bills'),

        ('Entertainment', 'Entertainment'),

        ('Health', 'Health'),

        ('Education', 'Education'),

        ('Other', 'Other'),

    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    monthly_limit = models.FloatField()

    month = models.CharField(
        max_length=20
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.user.username} "
            f"- {self.category} "
            f"- {self.month}"
        )