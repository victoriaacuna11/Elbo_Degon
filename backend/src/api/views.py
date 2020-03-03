from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django.views.generic import View
from django.db.models import Sum, Count


from .models import  (Employee,
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

from .serializers import  (EmployeeSerializer,
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


##@api_view(('GET',))
##def api_detail(request):
  ##  emp=Employee.objects.all()

    ##serializer=EmployeeSerializer(emp, many=True)

    ##return Response(serializer.data)


class EmployeeView(viewsets.ModelViewSet):

    serializer_class=EmployeeSerializer
    

    #No se si aqui se puede poner cualquier tipo de query y la vista se encarga de hacerla
    #No se si se pueden hacer queries antes y despues se lo igualamos a query set
    queryset=Employee.objects.all()  
    #Podemos crear objetos con objects.create antes de hacer el queryset??
    #Abajo se pueden poner funciones y como accedemos a ellas si solo usamos un view??







class ProductView(viewsets.ModelViewSet):    
    serializer_class=ProductSerializer
    queryset=Product.objects.all()
class ProductBatchView(viewsets.ModelViewSet):
    queryset=ProductBatch.objects.all()
    serializer_class=ProductBatchSerializer
class CategoryView(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer
class CurrencyExchangeView(viewsets.ModelViewSet):
    queryset=CurrencyExchange.objects.all()
    serializer_class=CurrencyExchangeSerializer
class BillView(viewsets.ModelViewSet):
    queryset=Bill.objects.all()
    serializer_class=BillSerializer
class BillProductView(viewsets.ModelViewSet):
    queryset=BillProduct.objects.all()
    serializer_class=BillProductSerializer
class PaymentView(viewsets.ModelViewSet):
    queryset=Payment.objects.all()
    serializer_class=PaymentSerializer
class Payment_BillView(viewsets.ModelViewSet):
    queryset=Payment_Bill.objects.all()
    serializer_class=Payment_BillSerializer
class PickUpView(viewsets.ModelViewSet):
    queryset=PickUp.objects.all()
    serializer_class=PickUpSerializer
class LocalView(viewsets.ModelViewSet):
    queryset=Local.objects.all()
    serializer_class=LocalSerializer
class DeliveryView(viewsets.ModelViewSet):
    queryset=Delivery.objects.all()
    serializer_class=DeliverySerializer
class ClientView(viewsets.ModelViewSet):
    queryset=Client.objects.all()
    serializer_class=ClientSerializer
class ProviderView(viewsets.ModelViewSet):
    queryset=Provider.objects.all()
    serializer_class=ProviderSerializer
class MembershipView(viewsets.ModelViewSet):
    queryset=Membership.objects.all()
    serializer_class=MembershipSerializer
class MonthEmployeeView(viewsets.ModelViewSet):
    queryset=MonthEmployee.objects.all()
    serializer_class=MonthEmployeeSerializer
class ZoneView(viewsets.ModelViewSet):
    queryset=Zone.objects.all()
    serializer_class=ZoneSerializer
class TaxView(viewsets.ModelViewSet):
    queryset=Tax.objects.all()
    serializer_class=TaxSerializer




#views de querys
class Product_Category(viewsets.ModelViewSet):
    
#     ##Category.objects.create(name="Algo") 
    
    serializer_class=ProductBatchSerializer
    filter_backends=[SearchFilter]
    search_fields=['elaboration_date']

    ##para esto s epone el q del video que viste
    def get_queryset(request, *args, **kwargs):

        queryset=ProductBatch.objects.all()

        return queryset



def get_data(request):

    algo={}
    lista = []

    q=Product.objects.values("product_name", "id", "category__name",'hall')

    #te retorna algo como el json que vas a utilizar el primer campo suele ser el id y los otros dependen de el
    for l in q:

        #algo.append(l[{'id', 'product_name', 'category__name'} ])
        algo.update({l["id"]:{
            "product_name":l["product_name"],
            "category_name":l["category__name"],
            'hall':l['hall']

        }})

        #esto sustituye el valor
        #algo.update({l["id"]:l[ "category__name" ]})
    

    print("-----------------------------------------------------------------------------------------------------------------")
    print(algo)

    
    
    return JsonResponse(algo)



def data_2(request):

    l=[]
    s=[]

    q=Product.objects.values('category__name').annotate(j=Count('category'))[0:5]


    for x in q:
        l.append(x['category__name'])
        s.append(x['j'])

    data={

        'CatName':l,
        'Cant':s

    }


    return JsonResponse(data)

    
def top5(request):
    

    l=[]
    s=[]

    q=BillProduct.objects.values('batch__product__product_name').annotate(j=Sum('quantity')).order_by('-j')[0:5]

    for x in q:
        l.append(x['batch__product__product_name'])
        s.append(x['j'])

    r=[]

    for x in range(len(l)):
        print(x)

        k={ 'id':x+1 ,'name':l[x], 'cant':s[x] }
        #print(k)
        r.append(k)
        print(r)



    data={
        'thing':r
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

    enero=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='01').annotate(e=Sum('quantity')).order_by('-e')[0:5]
    febrero=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='02').annotate(f=Sum('quantity')).order_by('-f')[0:5]
    marzo=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='03').annotate(m=Sum('quantity')).order_by('-m')[0:5]
    abril=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='04').annotate(a=Sum('quantity')).order_by('-a')[0:5]
    mayo=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='05').annotate(ma=Sum('quantity')).order_by('-ma')[0:5]
    junio=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='06').annotate(jun=Sum('quantity')).order_by('-jun')[0:5]
    julio=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='07').annotate(jul=Sum('quantity')).order_by('-jul')[0:5]
    agosto=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='08').annotate(ag=Sum('quantity')).order_by('-ag')[0:5]
    septiembre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='09').annotate(s=Sum('quantity')).order_by('-s')[0:5]
    octubre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='10').annotate(o=Sum('quantity')).order_by('-o')[0:5]
    noviembre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='11').annotate(n=Sum('quantity')).order_by('-n')[0:5]
    diciembre=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='12').annotate(d=Sum('quantity')).order_by('-d')[0:5]

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

    
    ene=[]

    for x in range(len(enero_n)):
        print(x)

        k={ 'id':x+1 ,'name':enero_n[x], 'cant':p_enero[x] }
        #print(k)
        ene.append(k)
    data_ene=['ENERO']
    data_ene.append(ene)
    

    feb=[]

    for x in range(len(febrero_n)):
        print(x)

        k={ 'id':x+1 ,'name':febrero_n[x], 'cant':p_febrero[x] }
        #print(k)
        feb.append(k)
    data_feb=['FEBRERO']
    data_feb.append(feb)


    mar=[]

    for x in range(len(marzo_n)):
        print(x)

        k={ 'id':x+1 ,'name':marzo_n[x], 'cant':p_marzo[x] }
        #print(k)
        mar.append(k)
    data_mar=['MARZO']
    data_mar.append(mar)

    ab=[]

    for x in range(len(abril_n)):
        print(x)

        k={ 'id':x+1 ,'name':abril_n[x], 'cant':p_abril[x] }
        #print(k)
        ab.append(k)
    
    data_ab=['ABRIL']
    data_ab.append(ab)


    may=[]

    for x in range(len(mayo_n)):
        print(x)

        k={ 'id':x+1 ,'name':mayo_n[x], 'cant':p_mayo[x] }
        #print(k)
        may.append(k)

    data_may=['MAYO']
    data_may.append(may)


    jun=[]

    for x in range(len(junio_n)):
        print(x)

        k={ 'id':x+1 ,'name':junio_n[x], 'cant':p_junio[x] }
        #print(k)
        jun.append(k)

    data_jun=['JUNIO']
    data_jun.append(jun)

    jul=[]

    for x in range(len(julio_n)):
        print(x)

        k={ 'id':x+1 ,'name':julio_n[x], 'cant':p_julio[x] }
        #print(k)
        jul.append(k)
    data_jul=['JULIO']
    data_jul.append(jul)
    

    ag=[]

    for x in range(len(agosto_n)):
        print(x)

        k={ 'id':x+1 ,'name':agosto_n[x], 'cant':p_agosto[x] }
        #print(k)
        ag.append(k)
    data_ag=['AGOSTO']
    data_ag.append(ag)
   # print(ene)
    
    
    se=[]

    for x in range(len(septiembre_n)):
        print(x)

        k={ 'id':x+1 ,'name':septiembre_n[x], 'cant':p_septiembre[x] }
        #print(k)
        se.append(k)
    data_se=['SEPTIEMBRE']
    data_se.append(se)
    #print(ene)


    oc=[]

    for x in range(len(octubre_n)):
        print(x)

        k={ 'id':x+1 ,'name':octubre_n[x], 'cant':p_octubre[x] }
        #print(k)
        oc.append(k)
    data_oc=['OCTUBRE']
    data_oc.append(oc)
    #print(ene)

    no=[]
    

    for x in range(len(noviembre_n)):
        print(x)

        k={ 'id':x+1 ,'name':noviembre_n[x], 'cant':p_noviembre[x] }
        #print(k)
        no.append(k)
    data_no=['NOVIEMBRE']
    data_no.append(no)
    #print(ene)

    di=[]
    
    

    for x in range(len(diciembre_n)):
        print(x)

        k={ 'id':x+1 ,'name':diciembre_n[x], 'cant':p_diciembre[x] }
        #print(k)
        di.append(k)
    #print(ene)
    data_di=['DICIEMBRE']
    data_di.append(di)

    data={

        'enero':data_ene,
        'febrero':data_feb,
        'marzo':data_mar,
        'abril':data_ab,
        'mayo':data_may,
        'junio':data_jun,
        'julio':data_jul,
        'agosto':data_ag,
        'septiembre':data_se,
        'octubre':data_oc,
        'noviembre':data_no,
        'diciembre':data_di

    }

    return JsonResponse(data)


##mas prod comprados por miembros
def top_miembros(request):
    
    p_miembros=[]
    
    cant_p=[]
    


    miembros=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True).annotate(j=Sum('quantity')).order_by('-j')[0:5]

    for x in miembros:
        p_miembros.append(x['batch__product__product_name'])

        cant_p.append(x['j'])
    

    p=[]

    for x in range(len(p_miembros)):
        print(x)

        k={ 'id':x+1 ,'name':p_miembros[x], 'cant':cant_p[x] }
        #print(k)
        p.append(k)


    data={
        'top_p_m':p
    }
    

    return JsonResponse(data)


def top_genero(request):

    hombres_p=[]
    hombres_cant=[]
    mujeres_p=[]
    mujeres_cant=[]
    otros_p=[]
    otros_cant=[]

    

    h=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Hombre").annotate(r=Sum('quantity')).order_by('-r')[0:3]
    m=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Mujer").annotate(t=Sum('quantity')).order_by('-t')[0:3]
    o=BillProduct.objects.values('batch__product__product_name').filter(bill_id__client__is_meber=True, bill_id__client__membership__gender="Otro").annotate(s=Sum('quantity')).order_by('-s')[0:3]



    #hombre
    for x in h:
        hombres_p.append(x['batch__product__product_name'])
        hombres_cant.append(x['r'])
    
    #mujer
    for x in m:
        mujeres_p.append(x['batch__product__product_name'])
        mujeres_cant.append(x['t'])
    
    #otro

    for x in o:
        otros_p.append(x['batch__product__product_name'])
        otros_cant.append(x['s'])
    
    

    hom=[]

    for x in range(len(hombres_p)):
        print(x)

        k={ 'id':x+1 ,'product':hombres_p[x], 'cant':hombres_cant[x] }
        #print(k)
        hom.append(k)

    data_hom=['HOMBRES']
    data_hom.append(hom)

    muj=[]

    for x in range(len(mujeres_p)):
        print(x)

        k={ 'id':x+1 ,'product':mujeres_p[x], 'cant':mujeres_cant[x] }
        #print(k)
        muj.append(k)
    data_muj=['MUJERES']
    data_muj.append(muj)

    ot=[]

    for x in range(len(otros_p)):
        print(x)

        k={ 'id':x+1 ,'product':otros_p[x], 'cant':otros_cant[x] }
        #print(k)
        ot.append(k)
    
    data_ot=['OTROS']
    data_ot.append(ot)

    data={
        'hombres':data_hom,
        'mujeres':data_muj,
        'otros':data_ot,
        
    }
    


    return JsonResponse(data)



    



def top_emp(request):
    
    emp_n=[]
    emp_l=[]
    emp_e=[]
    emp_p=[]

    q=Employee.objects.values('name','last_name','email','points').order_by('-points')[0:5]

        ##revisa para ver sis e puede devilver el nombre del cliente
    for x in q:
        emp_n.append(x['name'])
        emp_l.append(x['last_name'])
        emp_e.append(x['email'])
        emp_p.append(x['points'])
        #cant.append(x['j'])
    
    data_e=[]

    for x in range(len(emp_n)):
        k={'id':x+1,'name':emp_n[x],'last':emp_l[x],'email':emp_e[x], 'points':emp_p[x]}
        data_e.append(k)



    data={

        'algo':data_e
        
    }

    return JsonResponse(data)

    




def top_miem(request):

    member_n=[]
    member_l=[]
    member_e=[]
    member_p=[]

    q=Membership.objects.values('client__name','client__last_name','email', 'points').order_by('-points')[0:5]

        ##revisa para ver sis e puede devilver el nombre del cliente
    for x in q:
        member_n.append(x['client__name'])
        member_l.append(x['client__last_name'])
        member_e.append(x['email'])
        member_p.append(x['points'])
        #cant.append(x['j'])
    
    data_m=[]

    for x in range(len(member_n)):
        k={'id':x+1,'name':member_n[x],'last':member_l[x],'email':member_e[x],'points':member_p[x]}
        data_m.append(k)



    data={

        'algo':data_m
        
    }

    return JsonResponse(data)

    
    





def best_clients(request):

    client=[]
    cant=[]

    q=Bill.objects.values('client__name').annotate(j=Count('client')).order_by('-j')[0:5]


    for x in q:
        client.append(x['client__name'])
        cant.append(x['j'])

    cl=[]

    for x in range(len(client)):
        print(x)

        k={ 'id':x+1 ,'cliente':client[x], 'cant':cant[x] }
        #print(k)
        cl.append(k)

    data={
        'client':cl
    }
    
    return JsonResponse(data)


def topzonas(request):
    
    zonas=[]
    cant=[]

    q=Bill.objects.values('client__zone__name').annotate(j=Count('client__zone'))[0:5]

    for x in q:
        zonas.append(x['client__zone__name'])
        cant.append(x['j'])

    z=[]

    for x in range(len(zonas)):
        print(x)

        k={ 'id':x+1 ,'zone':zonas[x], 'cant':cant[x] }
        #print(k)
        z.append(k)

    data={

        'zonas':z
    }

    return JsonResponse(data)

def topdel(request):

    zonas=[]
    cant=[]

    q=Delivery.objects.values('zone__name').annotate(j=Count('zone'))[0:5]

    for x in q:
        zonas.append(x['zone__name'])
        cant.append(x['j'])

    z=[]

    for x in range(len(zonas)):
        print(x)

        k={ 'id':x+1 ,'zone':zonas[x], 'cant':cant[x] }
        #print(k)
        z.append(k)
    

    data={

        'zonas':z

    }

    return JsonResponse(data)

def festividades(request):

    navidad=[]
    s_valentin=[]
    halloween=[]

    cantn=[]
    cantsv=[]
    canth=[]


    nav=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='12', bill_id__date_time__day='24' ).annotate(d=Sum('quantity')).order_by('-d')[0:5]
    sval=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='02', bill_id__date_time__day='14' ).annotate(f=Sum('quantity')).order_by('-f')[0:5]
    hal=BillProduct.objects.values('batch__product__product_name').filter(bill_id__date_time__month='10', bill_id__date_time__day='31' ).annotate(g=Sum('quantity')).order_by('-g')[0:5]


    for x in nav:
        navidad.append(x['batch__product__product_name'])
        cantn.append(x['d'])
    for y in sval:
        s_valentin.append(y['batch__product__product_name'])
        cantsv.append(y['f'])
    for z in hal:
        halloween.append(z['batch__product__product_name'])
        canth.append(z['g'])

    n=[]

    for x in range(len(navidad)):
        print(x)

        k={ 'id':x+1 ,'product':navidad[x], 'cant':cantn[x] }
        #print(k)
        n.append(k)
    data_n=['NAVIDAD']
    data_n.append(n)

    v=[]

    for x in range(len(s_valentin)):
        print(x)

        k={ 'id':x+1 ,'product':s_valentin[x], 'cant':cantsv[x] }
        #print(k)
        v.append(k)
    data_v=['SAN VALENTIN']
    data_v.append(v)

    h=[]

    for x in range(len(halloween)):
        print(x)

        k={ 'id':x+1 ,'product':halloween[x], 'cant':canth[x] }
        #print(k)
        h.append(k)
    data_h=['HALLOWEEN']
    data_h.append(h)

    data={

        'navidad':data_n,
        'san_val':data_v,
        'halloween':data_h

    }

    return JsonResponse(data)


def top_prov(request):
    
    proveedores=[]
    unidades_vendidas=[]


    q=BillProduct.objects.values('batch__product__provider__name').annotate(j=Sum('quantity')).order_by('-j')[0:5]


    for x in q:
        proveedores.append(x['batch__product__provider__name'])
        unidades_vendidas.append(x['j'])

    prov=[]

    for x in range(len(proveedores)):
        print(x)

        k={ 'id':x+1 ,'product':proveedores[x], 'cant':unidades_vendidas[x] }
        #print(k)
        prov.append(k)
    
    data={
        'providers':prov
    }

    return JsonResponse(data)


def top_meses(request):


    enero=Bill.objects.all().filter(date_time__month='01').count()
    e={'mes':'ENERO','cant':enero}
    febrero=Bill.objects.all().filter(date_time__month='02').count()
    f={'mes':'FEBRERO','cant':febrero}
    marzo=Bill.objects.all().filter(date_time__month='03').count()
    mar={'mes':'MARZO','cant':marzo}
    abril=Bill.objects.all().filter(date_time__month='04').count()
    ab={'mes':'ABRIL','cant':abril}
    mayo=Bill.objects.all().filter(date_time__month='05').count()
    may={'mes':'MAYO','cant':mayo}
    junio=Bill.objects.all().filter(date_time__month='06').count()
    jun={'mes':'JUNIO','cant':junio}
    julio=Bill.objects.all().filter(date_time__month='07').count()
    jul={'mes':'JULIO','cant':julio}
    agosto=Bill.objects.all().filter(date_time__month='08').count()
    ag={'mes':'AGOSTO','cant':agosto}
    septiembre=Bill.objects.all().filter(date_time__month='09').count()
    s={'mes':'SEPTIEMBRE','cant':septiembre}
    octubre=Bill.objects.all().filter(date_time__month='10').count()
    o={'mes':'OCTUBRE','cant':octubre}
    noviembre=Bill.objects.all().filter(date_time__month='11').count()
    n={'mes':'NOVIEMBRE','cant':noviembre}
    diciembre=Bill.objects.all().filter(date_time__month='12').count()
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

   
   

    data={

        'data':data_mes

    }

    return JsonResponse(data)


def query_pay_tot_ci(request):

    ced=[]
    tot=[]
    payID=[]
    # print(payment)

    q=Payment.objects.values( 'payment_bill__bill__client__ci', 'payment_bill__bill__subtotal', 'id' )
    tax=Tax.objects.values('tax').filter(is_Active=True)

    t=(tax[0]['tax'])


    for x in q:
        
        ced.append(x['payment_bill__bill__client__ci'])
        tot.append(x['payment_bill__bill__subtotal'])
        payID.append(x['id'])
    
    j=[]

    for x in range(len(ced)):
        q=(tot[x]*t)+tot[x]
        k={'cedula': ced[x], 'total':q, 'id': payID[x]}
        j.append(k)


    data={

        'data':j
    }

    return JsonResponse(data)


def query_Bill_Client(request):

    ced=[]
    billid=[]
    tot=[]
    # print(payment)

    q=Bill.objects.values('client__ci', 'id', 'subtotal' )
    tax=Tax.objects.values('tax').filter(is_Active=True)

    t=(tax[0]['tax'])


    for x in q:
        
        ced.append(x['client__ci'])
        billid.append(x['id'])
        tot.append(x['subtotal'])
    
    j=[]

    for x in range(len(ced)):
        q=(tot[x]*t)+tot[x]
        k={'cedula': ced[x], 'id': billid[x], 'total': q}
        j.append(k)


    data={

        'data':j
    }

    return JsonResponse(data)

    