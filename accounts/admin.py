from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'first_name', 'last_name', 'school', 'location')
    list_filter = ('is_staff', 'is_active',)
    fieldsets = (
        ('Account', {'fields': ('email', 'password', 'first_name', 'last_name', 'school', 'location')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'school', 'location', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email', 'first_name', 'last_name', 'school', 'location')
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
admin.site.unregister(Group)
