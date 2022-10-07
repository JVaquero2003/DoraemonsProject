import pandas as pd
from gettext import find
import os
from pickle import FALSE, TRUE
from geopy.geocoders import Nominatim
directorio = os.path.expanduser('~\Documents')
month_word = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
year_word = ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", 
"2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"]
actualyear = -1
actualmonth = -1
table = [[]]
i = 0
url = "https://raw.githubusercontent.com/CostinDale/DoraemonNASA/main/2000-2022.csv"
df = pd.read_csv(url, delimiter=";", header= None)
dir = 'C:/Users/luism/Documents/doraemon/temperatures.txt'
f = open(dir, "w")

def geoloc(loc):
    loc = loc + ', España'
    geolocator = Nominatim(user_agent="my_request")
    location = geolocator.geocode(loc)
    return((location.latitude, location.longitude))


for index, row in df.iterrows():
    if row[0] in year_word:
        actualyear = row[0]
        if actualyear == '2017':
            break
        pass
    elif row[0] in month_word:
        actualmonth = row[0]
        pass
    else:
        table[i].append(actualyear)
        table[i].append(actualmonth)
        tuple = geoloc(row[0])
        table[i].append(tuple[0])
        table[i].append(tuple[1])
        table[i].append(row[0])
        table[i].append(row[1])
        table.append([])
        i = i+ 1
        

for k in range(len(table)-1):
    line = str(table[k][0]) + ";" + str(table[k][1]) + ";" + str(table[k][2]) + ";" + str(table[k][3]) + ";" + str(table[k][4]) + ";" + str(table[k][5])
    f.write(str(line))
    f.write("\n")



        