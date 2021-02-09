from django.db import models

# Create your models here.
class author(models.Model):
    id = models.autoField(primary_key = True)
    nombre = models.CharFild(max_length = 200, blank = False, null = False)
    apellidos = models.CharFild(max_length= 220, blank = False, null = False)
    nacionalidad = models.CharFild(max_length= 100, blank = False, null = False)
    descripcion = models.TextField(blank = False, null = False)
    
