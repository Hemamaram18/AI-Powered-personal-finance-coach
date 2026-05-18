from django.contrib import admin

from .models import (
    Transaction,
    Goal,
    Budget
)


admin.site.register(Transaction)

admin.site.register(Goal)

admin.site.register(Budget)