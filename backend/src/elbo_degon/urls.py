
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api-auth/', include('rest_framework.urls')),

# ]

from django.contrib import admin
from django.urls import path, include
from api.views import get_data, data_2,top5,prod_mes,best_clients,topzonas,topdel,festividades,top_genero,top_miembros,top_prov,top_miem,top_emp,top_meses, query_pay_tot_ci, query_Bill_Client, query_AddProductsToABill, productos_disp


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
    path('rest/query_pay_tot_ci/', query_pay_tot_ci),
    path('rest/query_Bill_Client/', query_Bill_Client),
    path('rest/query_AddProductsToABill', query_AddProductsToABill), 
    path('rest/query_productos_disp',productos_disp),
]
