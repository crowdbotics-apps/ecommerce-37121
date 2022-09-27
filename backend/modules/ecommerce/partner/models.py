from django.db import models
from oscar.apps.address.abstract_models import AbstractPartnerAddress
from oscar.apps.partner.abstract_models import AbstractPartner, AbstractStockRecord


class Partner(AbstractPartner):
    """
    A partner is a company or organisation that sells products to customers.
    """
    logo = models.ImageField(upload_to='partner/logo/', null=True, blank=True)
    cover = models.ImageField(upload_to='partner/cover/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    yelp = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name


class PartnerAddress(AbstractPartnerAddress):
    """
    A physical address for a partner
    """
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)


class StockRecord(AbstractStockRecord):
    """
    A stock record represents a StockItem at a particular partner with an id/SKU as identifier
    """
    pass


from oscar.apps.partner.models import *  # noqa isort:skip
