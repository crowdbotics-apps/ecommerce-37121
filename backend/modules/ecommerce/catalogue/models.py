from django.db import models
from oscar.apps.catalogue.abstract_models import AbstractProductClass, AbstractProduct


class Product(AbstractProduct):
    pass


class ProductClass(AbstractProductClass):
    image = models.ImageField(upload_to='product_class', null=True, blank=True)


from oscar.apps.catalogue.models import *  # noqa isort:skip
