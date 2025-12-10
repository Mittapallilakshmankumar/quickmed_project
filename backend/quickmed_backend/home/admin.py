from django.contrib import admin
from .models import Review,ContactRequest

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'rating', 'date')
    list_filter = ('rating', 'date')
    search_fields = ('name', 'email', 'comment')
    ordering = ('-id',)

@admin.register(ContactRequest)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'service', 'date')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('service', 'date')