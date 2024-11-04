from django.db import models

# Create your models here.

class UMLDiagram(models.Model):
    name = models.CharField(max_length=255)
    diagram = models.JSONField()  # This field will store the UML diagram in JSON format.
    

    def __str__(self):
        return self.name
