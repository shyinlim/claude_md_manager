# CLAUDE.md - 🌐 Django Framework Coordination


Django Project Setup:

# Django swarm initialization
[BatchTool]:
  - Bash("django-admin startproject myproject")
  - Bash("cd myproject && python manage.py startapp users")
  - Bash("cd myproject && python manage.py startapp api")
  - Write("myproject/settings.py", djangoSettings)
  - Write("users/models.py", userModels)
  - Write("api/serializers.py", drf_serializers)
  - Write("api/views.py", drf_views)
  - Write("api/urls.py", apiUrls)
  - Bash("cd myproject && python manage.py makemigrations")
  - Bash("cd myproject && python manage.py migrate")