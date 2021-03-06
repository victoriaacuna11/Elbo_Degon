
from .views import (EmployeeView, 
                    ProductView,
                    ProductBatchView,
                    CategoryView,
                    CurrencyExchangeView,
                    BillView,
                    BillProductView,
                    PaymentView,
                    Payment_BillView,
                    PickUpView,
                    LocalView,
                    DeliveryView,
                    ClientView,
                    ProviderView,
                    MembershipView,
                    MonthEmployeeView,
                    ZoneView,
                    Product_Category,
                    TaxView,
                    #get_data,
                    
                    
                    )
from django.urls import path
from rest_framework.routers import DefaultRouter

router= DefaultRouter()
router.register(r'emp',EmployeeView,basename='employees')
router.register(r'prod',ProductView,basename='product')
router.register(r'pbatch',ProductBatchView,basename='productbatch')
router.register(r'category',CategoryView,basename='category')
router.register(r'currency',CurrencyExchangeView,basename='currency')
router.register(r'bill',BillView,basename='bill')
router.register(r'billp',BillProductView,basename='billproduct')
router.register(r'pay',PaymentView,basename='payment')
router.register(r'paybill',Payment_BillView,basename='paymentbill')
router.register(r'pickup',PickUpView,basename='pickup')
router.register(r'local',LocalView,basename='local')
router.register(r'delivery',DeliveryView,basename='delivery')
router.register(r'client',ClientView,basename='client')
router.register(r'prov',ProviderView,basename='provider')
router.register(r'mem',MembershipView,basename='membership')
router.register(r'memp',MonthEmployeeView,basename='monthemployee')
router.register(r'zone',ZoneView,basename='zone')
router.register(r'tax',TaxView,basename='tax')
router.register(r'j',Product_Category,basename='pc')


urlpatterns = router.urls