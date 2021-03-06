from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'first_name', 'last_name',)
    list_filter = ('is_staff', 'is_active',)
    fieldsets = (
        ('Account', {'fields': (
            'username', 'email', 'password', 'first_name', 'last_name', 'school', 'location', 'paypal_username',
            'profile_img')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'first_name', 'last_name', 'school', 'location', 'paypal_username', 'profile_img',
                'password1', 'password2',
                'is_staff',
                'is_active',
                'is_superuser')}
         ),
    )
    search_fields = ('username', 'email', 'first_name', 'last_name', 'school', 'location')
    ordering = ('username',)


admin.site.register(User, CustomUserAdmin)
admin.site.unregister(Group)
