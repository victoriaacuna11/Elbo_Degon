
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api-auth/', include('rest_framework.urls')),

# ]

from django.contrib import admin
from django.urls import path, include
from api.views import *
from api.views import get_data, data_2,top5,prod_mes,best_clients,topzonas,topdel,festividades,top_genero,top_miembros,top_prov,top_miem,top_emp,top_meses, query_pay_tot_ci, query_Bill_Client


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
    # path('rest/query_vic', query_vic),
    path('rest/vista_delivery', vista_delivery),
    path('rest/vista_lotes', vista_lotes),
    path('rest/vista_pickup', vista_pickup),
    path('rest/cate/<cate>', prod_cat),
    path('rest/name/<name>', prod_name),
    path('rest/date/<start>/<end>', dates_top),
<<<<<<< HEAD
    path('rest/wilfredo', query_wilfredo),
    path('rest/qwill2', qwill2),
=======
    path('rest/query_vic2', query_vic2),
    #especial graficas
    path('rest/cant_bills_fest', cant_bills_fest),
    path('rest/cant_bill_genero', cant_bill_genero),
    path('rest/ofertas', ofertas),
    path('rest/sold/<cant>', prod_cant),

>>>>>>> romel2
    
    path('rest/query_pay_tot_ci/', query_pay_tot_ci),
    path('rest/query_Bill_Client/', query_Bill_Client),
]
