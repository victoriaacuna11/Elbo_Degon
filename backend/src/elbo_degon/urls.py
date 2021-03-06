
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api-auth/', include('rest_framework.urls')),

# ]

from django.contrib import admin
from django.urls import path, include
from api.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest/', include('api.urls')),
    path('rest/x', get_data),
    path('rest/l', data_2),
    path('rest/top', top5),
    path('rest/pm', prod_mes),
    path('rest/topm', top_miembros),
    path('rest/top_genero', top_genero),
    path('rest/top_emp', top_emp),
    path('rest/top_miem', top_miem),
    path('rest/bestc', best_clients),
    path('rest/topzonas', topzonas),
    path('rest/topdel', topdel),
    path('rest/fest', festividades),
    path('rest/topp', top_prov),
    path('rest/top_meses', top_meses),
    path('rest/query_vic', query_vic),
    path('rest/vista_delivery', vista_delivery),
    path('rest/vista_lotes', vista_lotes),
    path('rest/vista_pickup', vista_pickup),
    path('rest/cate/<cate>', prod_cat),
    path('rest/name/<name>', prod_name),
    path('rest/date/<start>/<end>', dates_top),
    path('rest/wilfredo', query_wilfredo),
    path('rest/qwill2', qwill2),
    path('rest/query_vic2', query_vic2),
    #especial graficas
    path('rest/cant_bills_fest', cant_bills_fest),
    path('rest/cant_bill_genero', cant_bill_genero),
    path('rest/ofertas', ofertas),
    path('rest/sold/<cant>', prod_cant),

    
    path('rest/query_pay_tot_ci/', query_pay_tot_ci),
    path('rest/query_Bill_Client/', query_Bill_Client),
    path('rest/query_AddProductsToABill', query_AddProductsToABill), 
    path('rest/query_productos_disp',productos_disp),
    path('rest/empleados_disp',qvic3),
    path('rest/taxAvailable',taxAvailable),
    path('rest/detalle_fac/<fact>',detalle_fac),

    path('rest/vic_paymentid/<data>',qvicfinal),
    path('rest/vic_clientid/<data>',qvicfinal2),
        path('rest/vic_clientci/<data>',qvicfinal3),




]
