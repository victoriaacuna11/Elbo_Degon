from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django.views.generic import View
from django.db.models import Sum, Count
import datetime


from .models import (Employee,
                     Product,
                     ProductBatch,
                     Category,
                     CurrencyExchange,
                     Bill,
                     BillProduct,
                     Payment,
                     Payment_Bill,
                     PickUp,
                     Local,
                     Delivery,
                     Client,
                     Provider,
                     Membership,
                     MonthEmployee,
                     Zone,
                     Tax)

from .serializers import (EmployeeSerializer,
                          ProductSerializer,
                          ProductBatchSerializer,
                          CategorySerializer,
                          CurrencyExchangeSerializer,
                          BillSerializer,
                          BillProductSerializer,
                          PaymentSerializer,
                          Payment_BillSerializer,
                          PickUpSerializer,
                          LocalSerializer,
                          DeliverySerializer,
                          ClientSerializer,
                          ProviderSerializer,
                          MembershipSerializer,
                          MonthEmployeeSerializer,
                          ZoneSerializer,
                          TaxSerializer)

# Create your views here.


# @api_view(('GET',))
# def api_detail(request):
# emp=Employee.objects.all()

##serializer=EmployeeSerializer(emp, many=True)

# return Response(serializer.data)


class EmployeeView(viewsets.ModelViewSet):

    serializer_class = EmployeeSerializer

    # No se si aqui se puede poner cualquier tipo de query y la vista se encarga de hacerla
    # No se si se pueden hacer queries antes y despues se lo igualamos a query set
    queryset = Employee.objects.all()
    # Podemos crear objetos con objects.create antes de hacer el queryset??
    # Abajo se pueden poner funciones y como accedemos a ellas si solo usamos un view??


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductBatchView(viewsets.ModelViewSet):
    queryset = ProductBatch.objects.all()
    serializer_class = ProductBatchSerializer


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CurrencyExchangeView(viewsets.ModelViewSet):
    queryset = CurrencyExchange.objects.all()
    serializer_class = CurrencyExchangeSerializer


class BillView(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


class BillProductView(viewsets.ModelViewSet):
    queryset = BillProduct.objects.all()
    serializer_class = BillProductSerializer


class PaymentView(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class Payment_BillView(viewsets.ModelViewSet):
    queryset = Payment_Bill.objects.all()
    serializer_class = Payment_BillSerializer


class PickUpView(viewsets.ModelViewSet):
    queryset = PickUp.objects.all()
    serializer_class = PickUpSerializer


class LocalView(viewsets.ModelViewSet):
    queryset = Local.objects.all()
    serializer_class = LocalSerializer


class DeliveryView(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ProviderView(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer


class MembershipView(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer


class MonthEmployeeView(viewsets.ModelViewSet):
    queryset = MonthEmployee.objects.all()
    serializer_class = MonthEmployeeSerializer


class ZoneView(viewsets.ModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer


class TaxView(viewsets.ModelViewSet):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer


# views de querys
class Product_Category(viewsets.ModelViewSet):

    #     ##Category.objects.create(name="Algo")

    serializer_class = ProductBatchSerializer
    filter_backends = [SearchFilter]
    search_fields = ['elaboration_date']

    # para esto s epone el q del video que viste
    def get_queryset(request, *args, **kwargs):

        queryset = ProductBatch.objects.all()

        return queryset


def get_data(request):

    algo = {}
    lista = []

    q = Product.objects.values("product_name", "id", "category__name", 'hall')

    # te retorna algo como el json que vas a utilizar el primer campo suele ser el id y los otros dependen de el
    for l in q:

        #algo.append(l[{'id', 'product_name', 'category__name'} ])
        algo.update({l["id"]: {
            "product_name": l["product_name"],
            "category_name": l["category__name"],
            'hall': l['hall']

        }})

        # esto sustituye el valor
        #algo.update({l["id"]:l[ "category__name" ]})

    print("-----------------------------------------------------------------------------------------------------------------")
    print(algo)

    return JsonResponse(algo)


def data_2(request):

    l = []
    s = []

    q = Product.objects.values('category__name').annotate(
        j=Count('category'))[0:5]

    for x in q:
        l.append(x['category__name'])
        s.append(x['j'])

    data = {

        'CatName': l,
        'Cant': s

    }

    return JsonResponse(data)


def top5(request):

    l = []
    s = []

    q=BillProduct.objects.values('batch__product__product_name').filter(availible=True, batch__product__availible=True, bill_id__availible=True).annotate(j=Sum('quantity')).filter(j__gt=0).order_by('-j')[0:5]

    for x in q:
        l.append(x['batch__product__product_name'])
        s.append(x['j'])

    r = []

    for x in range(len(l)):
        print(x)

        k = {'id': x+1, 'name': l[x], 'cant': s[x]}
        # print(k)
        r.append(k)
        # print(r)

    data = {
        'thing': r
    }

    return JsonResponse(data)


def prod_mes(request):


    enero_n=[]
    febrero_n=[]
    marzo_n=[]
    abril_n=[]
    mayo_n=[]
    junio_n=[]
    julio_n=[]
    agosto_n=[]
    septiembre_n=[]
    octubre_n=[]
    noviembre_n=[]
    diciembre_n=[]

    #productos
    p_enero=[]
    p_febrero=[]
    p_marzo=[]
    p_abril=[]
    p_mayo=[]
    p_junio=[]
    p_julio=[]
    p_agosto=[]
    p_septiembre=[]
    p_octubre=[]
    p_noviembre=[]
    p_diciembre=[]

    enero=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='01', bill_id__availible=True,availible=True).annotate(e=Sum('quantity')).filter(e__gt=0).order_by('-e')[0:5]
    febrero=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='02', bill_id__availible=True,availible=True).annotate(f=Sum('quantity')).filter(f__gt=0).order_by('-f')[0:5]
    marzo=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='03', bill_id__availible=True,availible=True).annotate(m=Sum('quantity')).filter(m__gt=0).order_by('-m')[0:5]
    abril=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='04', bill_id__availible=True,availible=True).annotate(a=Sum('quantity')).filter(a__gt=0).order_by('-a')[0:5]
    mayo=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='05', bill_id__availible=True,availible=True).annotate(ma=Sum('quantity')).filter(ma__gt=0).order_by('-ma')[0:5]
    junio=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='06', bill_id__availible=True,availible=True).annotate(jun=Sum('quantity')).filter(jun__gt=0).order_by('-jun')[0:5]
    julio=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='07', bill_id__availible=True,availible=True).annotate(jul=Sum('quantity')).filter(jul__gt=0).order_by('-jul')[0:5]
    agosto=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='08', bill_id__availible=True,availible=True).annotate(ag=Sum('quantity')).filter(ag__gt=0).order_by('-ag')[0:5]
    septiembre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='09', bill_id__availible=True,availible=True).annotate(s=Sum('quantity')).filter(s__gt=0).order_by('-s')[0:5]
    octubre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='10', bill_id__availible=True,availible=True).annotate(o=Sum('quantity')).filter(o__gt=0).order_by('-o')[0:5]
    noviembre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='11', bill_id__availible=True,availible=True).annotate(n=Sum('quantity')).filter(n__gt=0).order_by('-n')[0:5]
    diciembre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='12', bill_id__availible=True,availible=True).annotate(d=Sum('quantity')).filter(d__gt=0).order_by('-d')[0:5]

    for x in enero:
        enero_n.append(x['batch__product__product_name'])
        p_enero.append(x['e'])

    for x in febrero:
        febrero_n.append(x['batch__product__product_name'])
        p_febrero.append(x['f'])

    for x in marzo:
        marzo_n.append(x['batch__product__product_name'])
        p_marzo.append(x['m'])

    for x in abril:
        abril_n.append(x['batch__product__product_name'])
        p_abril.append(x['a'])

    for x in mayo:
        mayo_n.append(x['batch__product__product_name'])
        p_mayo.append(x['ma'])

    for x in junio:
        junio_n.append(x['batch__product__product_name'])
        p_junio.append(x['jun'])

    for x in julio:
        julio_n.append(x['batch__product__product_name'])
        p_julio.append(x['jul'])

    for x in agosto:
        agosto_n.append(x['batch__product__product_name'])
        p_agosto.append(x['ag'])

    for x in septiembre:
        septiembre_n.append(x['batch__product__product_name'])
        p_septiembre.append(x['s'])

    for x in octubre:
        octubre_n.append(x['batch__product__product_name'])
        p_octubre.append(x['o'])

    for x in noviembre:
        noviembre_n.append(x['batch__product__product_name'])
        p_noviembre.append(x['n'])

    for x in diciembre:
        diciembre_n.append(x['batch__product__product_name'])
        p_diciembre.append(x['d'])

    ene = []

    for x in range(len(enero_n)):
        print(x)

        k = {'id': x+1, 'name': enero_n[x], 'cant': p_enero[x]}
        # print(k)
        ene.append(k)
    data_ene = ['ENERO']
    data_ene.append(ene)

    feb = []

    for x in range(len(febrero_n)):
        print(x)

        k = {'id': x+1, 'name': febrero_n[x], 'cant': p_febrero[x]}
        # print(k)
        feb.append(k)
    data_feb = ['FEBRERO']
    data_feb.append(feb)

    mar = []

    for x in range(len(marzo_n)):
        print(x)

        k = {'id': x+1, 'name': marzo_n[x], 'cant': p_marzo[x]}
        # print(k)
        mar.append(k)
    data_mar = ['MARZO']
    data_mar.append(mar)

    ab = []

    for x in range(len(abril_n)):
        print(x)

        k = {'id': x+1, 'name': abril_n[x], 'cant': p_abril[x]}
        # print(k)
        ab.append(k)

    data_ab = ['ABRIL']
    data_ab.append(ab)

    may = []

    for x in range(len(mayo_n)):
        print(x)

        k = {'id': x+1, 'name': mayo_n[x], 'cant': p_mayo[x]}
        # print(k)
        may.append(k)

    data_may = ['MAYO']
    data_may.append(may)

    jun = []

    for x in range(len(junio_n)):
        print(x)

        k = {'id': x+1, 'name': junio_n[x], 'cant': p_junio[x]}
        # print(k)
        jun.append(k)

    data_jun = ['JUNIO']
    data_jun.append(jun)

    jul = []

    for x in range(len(julio_n)):
        print(x)

        k = {'id': x+1, 'name': julio_n[x], 'cant': p_julio[x]}
        # print(k)
        jul.append(k)
    data_jul = ['JULIO']
    data_jul.append(jul)

    ag = []

    for x in range(len(agosto_n)):
        print(x)

        k = {'id': x+1, 'name': agosto_n[x], 'cant': p_agosto[x]}
        # print(k)
        ag.append(k)
    data_ag = ['AGOSTO']
    data_ag.append(ag)
   # print(ene)

    se = []

    for x in range(len(septiembre_n)):
        print(x)

        k = {'id': x+1, 'name': septiembre_n[x], 'cant': p_septiembre[x]}
        # print(k)
        se.append(k)
    data_se = ['SEPTIEMBRE']
    data_se.append(se)
    # print(ene)

    oc = []

    for x in range(len(octubre_n)):
        print(x)

        k = {'id': x+1, 'name': octubre_n[x], 'cant': p_octubre[x]}
        # print(k)
        oc.append(k)
    data_oc = ['OCTUBRE']
    data_oc.append(oc)
    # print(ene)

    no = []

    for x in range(len(noviembre_n)):
        print(x)

        k = {'id': x+1, 'name': noviembre_n[x], 'cant': p_noviembre[x]}
        # print(k)
        no.append(k)
    data_no = ['NOVIEMBRE']
    data_no.append(no)
    # print(ene)

    di = []

    for x in range(len(diciembre_n)):
        print(x)

        k = {'id': x+1, 'name': diciembre_n[x], 'cant': p_diciembre[x]}
        # print(k)
        di.append(k)
    # print(ene)
    data_di = ['DICIEMBRE']
    data_di.append(di)

    data = {

        'enero': data_ene,
        'febrero': data_feb,
        'marzo': data_mar,
        'abril': data_ab,
        'mayo': data_may,
        'junio': data_jun,
        'julio': data_jul,
        'agosto': data_ag,
        'septiembre': data_se,
        'octubre': data_oc,
        'noviembre': data_no,
        'diciembre': data_di

    }

    return JsonResponse(data)


# mas prod comprados por miembros
def top_miembros(request):

    p_miembros = []

    cant_p = []

    miembros=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__availible=True, availible=True, bill_id__availible=True).annotate(j=Sum('quantity')).filter(j__gt=0).order_by('-j')[0:5]

    for x in miembros:
        p_miembros.append(x['batch__product__product_name'])

        cant_p.append(x['j'])

    p = []

    for x in range(len(p_miembros)):
        print(x)

        k = {'id': x+1, 'name': p_miembros[x], 'cant': cant_p[x]}
        # print(k)
        p.append(k)

    data = {
        'top_p_m': p
    }

    return JsonResponse(data)


def top_genero(request):

    hombres_p=[]
    hombres_cant=[]
    mujeres_p=[]
    mujeres_cant=[]
    otros_p=[]
    otros_cant=[]

    

    h=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Hombre", bill_id__client__availible=True,  bill_id__availible=True, availible=True).annotate(r=Sum('quantity')).filter(r__gt=0).order_by('-r')[0:3]
    m=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Mujer", bill_id__client__availible=True,  bill_id__availible=True, availible=True).annotate(t=Sum('quantity')).filter(t__gt=0).order_by('-t')[0:3]
    o=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Otro", bill_id__client__availible=True,  bill_id__availible=True, availible=True).annotate(s=Sum('quantity')).filter(s__gt=0).order_by('-s')[0:3]



    #hombre
    for x in h:
        hombres_p.append(x['batch__product__product_name'])
        hombres_cant.append(x['r'])

    # mujer
    for x in m:
        mujeres_p.append(x['batch__product__product_name'])
        mujeres_cant.append(x['t'])

    # otro

    for x in o:
        otros_p.append(x['batch__product__product_name'])
        otros_cant.append(x['s'])

    hom = []

    for x in range(len(hombres_p)):
        print(x)

        k = {'id': x+1, 'product': hombres_p[x], 'cant': hombres_cant[x]}
        # print(k)
        hom.append(k)

    data_hom = ['HOMBRES']
    data_hom.append(hom)

    muj = []

    for x in range(len(mujeres_p)):
        print(x)

        k = {'id': x+1, 'product': mujeres_p[x], 'cant': mujeres_cant[x]}
        # print(k)
        muj.append(k)
    data_muj = ['MUJERES']
    data_muj.append(muj)

    ot = []

    for x in range(len(otros_p)):
        print(x)

        k = {'id': x+1, 'product': otros_p[x], 'cant': otros_cant[x]}
        # print(k)
        ot.append(k)

    data_ot = ['OTROS']
    data_ot.append(ot)

    data = {
        'hombres': data_hom,
        'mujeres': data_muj,
        'otros': data_ot,

    }

    return JsonResponse(data)

def cant_bill_genero(request):

    hom=BillProduct.objects.all().filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Hombre", bill_id__client__availible=True,  bill_id__availible=True, availible=True).count()
    muj=BillProduct.objects.all().filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Mujer", bill_id__client__availible=True,  bill_id__availible=True, availible=True).count()
    otr=BillProduct.objects.all().filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Otro", bill_id__client__availible=True,  bill_id__availible=True, availible=True).count()





    data={
        'hombres':hom,
        'mujeres':muj,
        'otros':otr,
    }
    

    return JsonResponse(data)


def top_emp(request):

    emp_n=[]
    emp_l=[]
    emp_e=[]
    emp_p=[]

    q=Employee.objects.values('name','last_name','email','points').filter(availible=True).order_by('-points')[0:5]

    q = Employee.objects.values(
        'name', 'last_name', 'email', 'points').order_by('-points')[0:5]

    # revisa para ver sis e puede devilver el nombre del cliente
    for x in q:
        emp_n.append(x['name'])
        emp_l.append(x['last_name'])
        emp_e.append(x['email'])
        emp_p.append(x['points'])
        # cant.append(x['j'])

    data_e = []

    for x in range(len(emp_n)):
        k = {'id': x+1, 'name': emp_n[x], 'last': emp_l[x],
             'email': emp_e[x], 'points': emp_p[x]}
        data_e.append(k)

    data = {

        'algo': data_e

    }

    return JsonResponse(data)


def top_miem(request):

    member_n = []
    member_l = []
    member_e = []
    member_p = []

    q=Membership.objects.values('client__name','client__last_name','email', 'points').filter(availible=True,client__availible=True).order_by('-points')[0:5]

    # revisa para ver sis e puede devilver el nombre del cliente
    for x in q:
        member_n.append(x['client__name'])
        member_l.append(x['client__last_name'])
        member_e.append(x['email'])
        member_p.append(x['points'])
        # cant.append(x['j'])

    data_m = []

    for x in range(len(member_n)):
        k = {'id': x+1, 'name': member_n[x], 'last': member_l[x],
             'email': member_e[x], 'points': member_p[x]}
        data_m.append(k)

    data = {

        'algo': data_m

    }

    return JsonResponse(data)


def best_clients(request):

    client=[]
    cant=[]

    q=Bill.objects.values('client__name').filter(availible=True,client__availible=True).annotate(j=Count('client')).filter(j__gt=0).order_by('-j')[0:5]

    q = Bill.objects.values('client__name').annotate(
        j=Count('client')).order_by('-j')[0:5]

    for x in q:
        client.append(x['client__name'])
        cant.append(x['j'])

    cl = []

    for x in range(len(client)):
        print(x)

        k = {'id': x+1, 'cliente': client[x], 'cant': cant[x]}
        # print(k)
        cl.append(k)

    data = {
        'client': cl
    }

    return JsonResponse(data)


def topzonas(request):

    zonas=[]
    cant=[]

    q=Bill.objects.values('client__zone__name').filter(availible=True,client__zone__availible=True).annotate(j=Count('client__zone')).filter(j__gt=0)[0:5]

    for x in q:
        zonas.append(x['client__zone__name'])
        cant.append(x['j'])

    z = []

    for x in range(len(zonas)):
        print(x)

        k = {'id': x+1, 'zone': zonas[x], 'cant': cant[x]}
        # print(k)
        z.append(k)

    data = {

        'zonas': z
    }

    return JsonResponse(data)


def topdel(request):

    zonas = []
    cant = []

    q=Delivery.objects.values('zone__name').filter(availible=True,zone__availible=True).annotate(j=Count('zone')).filter(j__gt=0)[0:5]

    for x in q:
        zonas.append(x['zone__name'])
        cant.append(x['j'])

    z = []

    for x in range(len(zonas)):
        print(x)

        k = {'id': x+1, 'zone': zonas[x], 'cant': cant[x]}
        # print(k)
        z.append(k)

    data = {

        'zonas': z

    }

    return JsonResponse(data)



def festividades(request):

    navidad = []
    s_valentin = []
    halloween = []
    cantn=[]
    cantsv=[]
    canth=[]

    nav=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='12', bill_id__date_time__day='24' ,availible=True, batch__product__availible=True, bill_id__availible=True).annotate(d=Sum('quantity')).filter(d__gt=0).order_by('-d')[0:5]
    sval=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='02', bill_id__date_time__day='14' ,availible=True, batch__product__availible=True, bill_id__availible=True).annotate(f=Sum('quantity')).filter(f__gt=0).order_by('-f')[0:5]
    hal=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='10', bill_id__date_time__day='31',availible=True, batch__product__availible=True, bill_id__availible=True ).annotate(g=Sum('quantity')).filter(g__gt=0).order_by('-g')[0:5]

    nav = BillProduct.objects.values('batch__product__product_name').filter(
        bill_id__date_time__month='12', bill_id__date_time__day='24').annotate(d=Sum('quantity')).order_by('-d')[0:5]
    sval = BillProduct.objects.values('batch__product__product_name').filter(
        bill_id__date_time__month='02', bill_id__date_time__day='14').annotate(f=Sum('quantity')).order_by('-f')[0:5]
    hal = BillProduct.objects.values('batch__product__product_name').filter(
        bill_id__date_time__month='10', bill_id__date_time__day='31').annotate(g=Sum('quantity')).order_by('-g')[0:5]

    for x in nav:
        navidad.append(x['batch__product__product_name'])
        cantn.append(x['d'])
    for y in sval:
        s_valentin.append(y['batch__product__product_name'])
        cantsv.append(y['f'])
    for z in hal:
        halloween.append(z['batch__product__product_name'])
        canth.append(z['g'])

    n = []

    for x in range(len(navidad)):
        print(x)

        k = {'id': x+1, 'product': navidad[x], 'cant': cantn[x]}
        # print(k)
        n.append(k)
    data_n = ['NAVIDAD']
    data_n.append(n)

    v = []

    for x in range(len(s_valentin)):
        print(x)

        k = {'id': x+1, 'product': s_valentin[x], 'cant': cantsv[x]}
        # print(k)
        v.append(k)
    data_v = ['SAN VALENTIN']
    data_v.append(v)

    h = []

    for x in range(len(halloween)):
        print(x)

        k = {'id': x+1, 'product': halloween[x], 'cant': canth[x]}
        # print(k)
        h.append(k)
    data_h = ['HALLOWEEN']
    data_h.append(h)

    data = {

        'navidad': data_n,
        'san_val': data_v,
        'halloween': data_h

    }

    return JsonResponse(data)




def cant_bills_fest(request):

    
    nav=[]
    sval=[]
    hal=[]

    nav=BillProduct.objects.all().filter(bill_id__date_time__month='12', bill_id__date_time__day='24' ,availible=True, batch__product__availible=True, bill_id__availible=True).count()
    sval=BillProduct.objects.all().filter(bill_id__date_time__month='02', bill_id__date_time__day='14' ,availible=True, batch__product__availible=True, bill_id__availible=True).count()
    hal=BillProduct.objects.all().filter(bill_id__date_time__month='10', bill_id__date_time__day='31',availible=True, batch__product__availible=True, bill_id__availible=True ).count()




    data={

        'navidad':nav,
        'san_val':sval,
        'halloween':hal

    }

    return JsonResponse(data)


def top_prov(request):

    proveedores=[]
    unidades_vendidas=[]

    q=BillProduct.objects.values('batch__product__provider__name').filter(availible=True,batch__product__availible=True,batch__product__provider__availible=True).annotate(j=Sum('quantity')).filter(j__gt=0).order_by('-j')[0:5]

    q = BillProduct.objects.values('batch__product__provider__name').annotate(
        j=Sum('quantity')).order_by('-j')[0:5]

    for x in q:
        proveedores.append(x['batch__product__provider__name'])
        unidades_vendidas.append(x['j'])

    prov = []

    for x in range(len(proveedores)):
        print(x)

        k = {'id': x+1,
             'product': proveedores[x], 'cant': unidades_vendidas[x]}
        # print(k)
        prov.append(k)

    data = {
        'providers': prov
    }

    return JsonResponse(data)


def top_meses(request):


    enero=Bill.objects.all().filter(date_time__month='01',availible=True).count()
    e={'mes':'ENERO','cant':enero}
    febrero=Bill.objects.all().filter(date_time__month='02',availible=True).count()
    f={'mes':'FEBRERO','cant':febrero}
    marzo=Bill.objects.all().filter(date_time__month='03',availible=True).count()
    mar={'mes':'MARZO','cant':marzo}
    abril=Bill.objects.all().filter(date_time__month='04',availible=True).count()
    ab={'mes':'ABRIL','cant':abril}
    mayo=Bill.objects.all().filter(date_time__month='05',availible=True).count()
    may={'mes':'MAYO','cant':mayo}
    junio=Bill.objects.all().filter(date_time__month='06',availible=True).count()
    jun={'mes':'JUNIO','cant':junio}
    julio=Bill.objects.all().filter(date_time__month='07',availible=True).count()
    jul={'mes':'JULIO','cant':julio}
    agosto=Bill.objects.all().filter(date_time__month='08',availible=True).count()
    ag={'mes':'AGOSTO','cant':agosto}
    septiembre=Bill.objects.all().filter(date_time__month='09',availible=True).count()
    s={'mes':'SEPTIEMBRE','cant':septiembre}
    octubre=Bill.objects.all().filter(date_time__month='10',availible=True).count()
    o={'mes':'OCTUBRE','cant':octubre}
    noviembre=Bill.objects.all().filter(date_time__month='11',availible=True).count()
    n={'mes':'NOVIEMBRE','cant':noviembre}
    diciembre=Bill.objects.all().filter(date_time__month='12',availible=True).count()
    d={'mes':'DICIEMBRE','cant':diciembre}

    data_mes=[]
    data_mes.append(e)
    data_mes.append(f)
    data_mes.append(mar)
    data_mes.append(ab)
    data_mes.append(may)
    data_mes.append(jun)
    data_mes.append(jul)
    data_mes.append(ag)
    data_mes.append(s)
    data_mes.append(o)
    data_mes.append(n)
    data_mes.append(d)

    data = {

        'data': data_mes

    }

    return JsonResponse(data)


def query_pay_tot_ci(request):

    ids = []
    ced = []
    tot = []

    q = Payment.objects.values(
        'id', 'payment_bill__bill__client__ci', 'payment_bill__bill__subtotal')
    tax = Tax.objects.values('tax').filter(is_Active=True)

    t = (tax[0]['tax'])

    for x in q:
        ids.append(x['id'])
        ced.append(x['payment_bill__bill__client__ci'])
        tot.append(x['payment_bill__bill__subtotal'])

    j = []

    for x in range(len(ced)):
        q = tot[x]*t+tot[x]

        k = {'id': ids[x], 'cedula': ced[x], 'total': q}
        j.append(k)

    data = {

        'data': j
    }

    return JsonResponse(data)


def vista_pickup(request):

    ids = []
    ci = []
    date = []
    ava = []

    q = PickUp.objects.values(
        'id', 'bill_id__client__ci', 'bill_id__date_time', 'availible')

    for x in q:
        ids.append(x['id'])
        ci.append(x['bill_id__client__ci'])
        date.append(x['bill_id__date_time'])
        ava.append(x['availible'])

    data_p = []

    for x in range(len(ids)):

        k = {'id': ids[x], 'ci': ci[x], 'date': date[x], 'availible': ava[x]}
        data_p.append(k)

    data = {
        'data': data_p
    }

    return JsonResponse(data)


def query_wilfredo(request):

    ids = []
    ci = []
    date = []
    deli = []
    loc = []
    payID = []
    # print(payment)

    q = Payment.objects.values(
        'payment_bill__bill__client__ci', 'payment_bill__bill__subtotal', 'id')
    tax = Tax.objects.values('tax').filter(is_Active=True)

    t = (tax[0]['tax'])

    q = PickUp.objects.values('id', 'bill_id__client__name',
                              'delivered', 'local__address', 'bill_id__date_time')

    for x in q:
        ids.append(x['id'])
        ci.append(x['bill_id__client__name'])
        date.append(x['bill_id__date_time'])
        deli.append(x['delivered'])
        loc.append(x['local__address'])

    data_p = []

    for x in range(len(ids)):

        k = {'id': ids[x], 'ci': ci[x], 'date': date[x],
             'local': loc[x], 'deli': deli[x]}
        data_p.append(k)

    data = {
        'data': data_p
    }

    return JsonResponse(data)


def vista_delivery(request):

    ids = []
    ci = []
    date = []
    ava = []

    q = Delivery.objects.values(
        'id', 'bill_id__client__ci', 'bill_id__date_time', 'availible')

    for x in q:
        ids.append(x['id'])
        ci.append(x['bill_id__client__ci'])
        date.append(x['bill_id__date_time'])
        ava.append(x['availible'])

    data_p = []

    for x in range(len(ids)):

        k = {'id': ids[x], 'ci': ci[x], 'date': date[x], 'availible': ava[x]}
        data_p.append(k)

    data = {
        'data': data_p
    }

    return JsonResponse(data)
    #     ced.append(x['payment_bill__bill__client__ci'])
    #     tot.append(x['payment_bill__bill__subtotal'])
    #     payID.append(x['id'])

    # j=[]

    # for x in range(len(ced)):
    #     q=(tot[x]*t)+tot[x]
    #     k={'cedula': ced[x], 'total':q, 'id': payID[x]}
    #     j.append(k)


def vista_lotes(request):

    ids = []
    prod = []
    f_exp = []
    f_elab = []
    ava = []

    q = ProductBatch.objects.values(
        'id', 'product__product_name', 'expiration_date', 'elaboration_date', 'availible')

    for x in q:
        ids.append(x['id'])
        prod.append(x['product__product_name'])
        f_exp.append(x['expiration_date'])
        f_elab.append(x['elaboration_date'])
        ava.append(x['availible'])

    data_batch = []

    for x in range(len(ids)):
        k = {'id': ids[x], 'product': prod[x], 'exp': f_exp[x],
             'elab': f_elab[x], 'availible': ava[x]}
        data_batch.append(k)

    data = {
        'data': data_batch
    }

    return JsonResponse(data)


def prod_cat(request,cate):
    
    ids=[]
    prod=[]
    q=Product.objects.values('id','product_name').filter(category__name__icontains=cate,availible=True)

    for x in q:
        prod.append(x['product_name'])
        ids.append(x['id'])
    data_p = []

    for x in range(len(ids)):
        k = {'id': ids[x], 'product': prod[x]}
        data_p.append(k)

    data = {
        'data': data_p
    }

    return JsonResponse(data)


def prod_name(request,name):
    ids=[]
    prod=[]
    q=Product.objects.values('id','product_name').filter(product_name__icontains=name,availible=True)

    for x in q:
        prod.append(x['product_name'])
        ids.append(x['id'])

    data_p = []

    for x in range(len(ids)):
        k = {'id': ids[x], 'product': prod[x]}
        data_p.append(k)

    data = {
        'data': data_p
    }

    return JsonResponse(data)


# mas ventas en este periodo de tiempo
def dates_top(request, start, end):

    prod = []
    cant = []

    q=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__range=[start,end],availible=True,batch__product__availible=True,bill_id__availible=True).annotate(e=Sum('quantity')).filter(e__gt=0).order_by('-e')[0:5]

    for x in q:
        prod.append(x['batch__product__product_name'])
        cant.append(x['e'])

    data_p = []

    for x in range(len(prod)):
        k={ 'id':x+1, 'product':prod[x],'cant':cant[x]}
        data_p.append(k)
    data = {
        'data': data_p
    }

    return JsonResponse(data)

def query_vic2(request):
    
    ids=[]
    price=[]
    product=[]
    quan=[]
    disc=[]
    exp=[]


    date=datetime.date.today()

    q=ProductBatch.objects.values('id','price','product','actual_quantity','discount','expiration_date').filter(availible=True, product__availible=True, expiration_date__gt=date)


    for x in q:
        ids.append(x['id'])
        price.append(x['price'])
        product.append(x['product'])
        quan.append(x['actual_quantity'])
        disc.append(x['discount'])
        exp.append(x['expiration_date'])
    
    data_p=[]

    for x in range(len(ids)):
        k={'id':ids[x],'product':product[x],'price':price[x],'quan':quan[x],'sold':disc[x], 'exp':exp[x] }
        data_p.append(k)
    
    data={
        'data':data_p
    }

    return JsonResponse(data)


def qwill2(request):
    cl = []
    ids = []
    ci = []
    name = []
    last = []
    zone = []
    ava = []

    q = Membership.objects.values(
        'client', 'client__ci', 'client__name', 'client__last_name', 'client__zone__name', 'id', 'availible')

    for x in q:

        cl.append(x['client'])
        ids.append(x['id'])
        ci.append(x['client__ci'])
        name.append(x['client__name'])
        last.append(x['client__last_name'])
        zone.append(x['client__zone__name'])
        ava.append(x['availible'])

    data_c = []
    for x in range(len(ids)):
        k = {'id': ids[x], 'ci': ci[x], 'name': name[x],
             'last': last[x], 'zone': zone[x], 'avalible': ava[x], 'client': cl[x]}
        data_c.append(k)

    data = {
        'data': data_c
        # 'data':j
    }

    return JsonResponse(data)


def query_Bill_Client(request):

    ced = []
    billid = []
    tot = []
    # print(payment)

    q = Bill.objects.values('client__ci', 'id', 'subtotal')
    tax = Tax.objects.values('tax').filter(is_Active=True)

    t = (tax[0]['tax'])

    for x in q:

        ced.append(x['client__ci'])
        billid.append(x['id'])
        tot.append(x['subtotal'])

    j = []

    for x in range(len(ced)):
        q = (tot[x]*t)+tot[x]
        k = {'cedula': ced[x], 'id': billid[x], 'total': q}
        j.append(k)

    data = {

        'data': j
    }

    return JsonResponse(data)


def query_AddProductsToABill(request):

    ids=[]
    price=[]
    product=[]
    quan=[]
    disc=[]
    exp=[]
    loc=[]


    date=datetime.date.today()

    q=ProductBatch.objects.values('id','price','product','actual_quantity','discount','expiration_date', 'local').filter(availible=True, product__availible=True, expiration_date__gt=date).order_by('expiration_date')


    for x in q:
        ids.append(x['id'])
        price.append(x['price'])
        product.append(x['product'])
        quan.append(x['actual_quantity'])
        disc.append(x['discount'])
        exp.append(x['expiration_date'])
        loc.append(x['local'])
    
    data_p=[]

    for x in range(len(ids)):
        k={'id':ids[x],'product':product[x],'price':price[x],'quan':quan[x],'sold':disc[x], 'exp':exp[x], 'local':loc[x] }
        data_p.append(k)
    
    data={
        'data':data_p
    }

    return JsonResponse(data)


#     for x in q:

#         ced.append(x['client__ci'])
#         billid.append(x['id'])
#         tot.append(x['subtotal'])

#     j=[]



def qvic3(request):

    ids=[]

    q=Employee.objects.values('id').filter(availible=True, job_id='Repartidor')

    for x in q:
        ids.append(x['id'])


    data={
        'data':ids
    }

    return JsonResponse(data)

def taxAvailable(request):


    tax=[]
    q=Tax.objects.values('tax').filter(is_Active=True)

    for x in q:
        tax.append(x['tax'])

    data={
        'data': tax
    }

    return JsonResponse(data)




def ofertas(request):

    name=[]
    disc=[]

    q=ProductBatch.objects.values('product__product_name','discount').filter(availible=True, product__availible=True, discount__gt=0, actual_quantity__gt=0)

    for x in q:
        name.append(x['product__product_name'])
        disc.append(x['discount'])


    data_p=[]

    for x in range(len(name)):
        k={'name':name[x], 'discount':disc[x]}
        data_p.append(k)
    

    data={
        'data':data_p
    }
    return JsonResponse(data)

def prod_cant(request,cant):
    
    l=[]
    s=[]

    q=BillProduct.objects.values('batch__product__product_name').filter(availible=True, batch__product__availible=True, bill_id__availible=True).annotate(j=Sum('quantity')).filter(j__gte=cant).order_by('-j')[0:5]

    for x in q:
        l.append(x['batch__product__product_name'])
        s.append(x['j'])

    r=[]

    for x in range(len(l)):
        print(x)

        k={ 'name':l[x], 'cant':s[x] }
        #print(k)
        r.append(k)
        #print(r)



    data={
        'thing':r
    }


    return JsonResponse(data)


def query_vic(request):

    ids=[]
    ced=[]
    tot=[]

    q=Payment.objects.values( 'id','payment_bill__bill__client__ci', 'payment_bill__bill__subtotal' )
    tax=Tax.objects.values('tax').filter(is_Active=True)
    
    t=(tax[0]['tax'])

    for x in q:
        ids.append(x['id'])
        ced.append(x['payment_bill__bill__client__ci'])
        tot.append(x['payment_bill__bill__subtotal'])

    j=[]

    for x in range(len(ced)):
        q=tot[x]*t+tot[x]

        k={'id':ids[x], 'cedula':ced[x],'total':q}
        j.append(k)

    data={

        'data':j
    }

    return JsonResponse(data)

def productos_disp(request):

    date=datetime.date.today()

    ids_p=[]
    name=[]

    id_b=[]
    cant=[]
    pr=[]
    price=[]
    disc=[]

    q1=Product.objects.values('id','product_name').filter(availible=True)

    q2=ProductBatch.objects.values('id','product', 'actual_quantity', 'discount','price').filter(availible=True, expiration_date__gt=date)


    for x in q1:
        ids_p.append(x['id'])
        name.append(x['product_name'])

    for x in q2:
        id_b.append(x['id'])
        cant.append(x['actual_quantity'])
        pr.append(x['product'])
        price.append(x['price'])
        disc.append(x['discount'])
    

    batches=[]
    for x in range(len(id_b)):
        b={'id':id_b[x], 'cant':cant[x] ,'produ':pr[x], 'price':price[x], 'discount':disc[x] }
        batches.append(b)
    
    data_p=[]

    for x in range(len(ids_p)):
        j=ids_p[x]
        arr=[]

        for y in range(len(batches)):
            if j==batches[y]['produ']:

                arr.append(batches[y])
            
        k={'id':ids_p[x],'nombre':name[x],'lote':arr}
        data_p.append(k)
    
    data={
        'data':data_p
    }

    return JsonResponse(data)

def detalle_fac(request, fact ):

    ids=[]
    ci=[]
    name=[]
    ln=[]
    subtotal=[]

    pname=[]
    quan=[]
    bid=[]



    q1=Bill.objects.values( 'id' ,'client__ci','client__name','client__last_name', 'subtotal').filter(id=fact)
    q2=BillProduct.objects.values('batch__product__product_name','quantity', 'bill_id' ).filter(bill_id=fact)
    tax=Tax.objects.values('tax').filter(is_Active=True)
    
    t=(tax[0]['tax'])


    for x in q1:
        ids.append(x['id'])
        ci.append(x['client__ci'])
        name.append(x['client__name'])
        ln.append(x['client__last_name'])
        subtotal.append(x['subtotal'])

    for x in q2:
        pname.append(x['batch__product__product_name'])
        quan.append(x['quantity'])
        bid.append(x['bill_id'])

    bp=[]

    for x in range(len(quan)):

        j={'name':pname[x], 'quantity':quan[x], 'bill':bid[x]}
        bp.append(j)
    
    data_p=[]

    for x in range(len(ids)):

        r=ids[x]
        arr=[]

        for y in range(len(bp)):
            if r==bp[y]['bill']:
                arr.append(bp[y])

        p=subtotal[x]*t+subtotal[x]

        k={'id':ids[x], 'ci':ci[x], 'name':name[x], 'ln':ln[x], 'subtotal':p , 'products':arr}
        data_p.append(k)

    data={
        'data':data_p
    }

    return JsonResponse(data)


    

