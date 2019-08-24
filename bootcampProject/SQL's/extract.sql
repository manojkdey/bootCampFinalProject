--select  distinct name from junk;

--delete from junk where name in ('Brazil','China','China mainland','India','USSR')
select * from emsnBySector where CountryName not in (
'Africa',
'Americas',
'Annex I countries',
'Asia',
'China, mainland',
'Eastern Asia',
'Eastern Europe',
'Europe',
'European Union',
'Land Locked Developing Countries',
'Least developed countries',
'Low Income Food Deficit Countries',
'Net Food Importing Developing Countries',
'Non-Annex I countries',
'Northern America',
'OECD',
'South America',
'South-Eastern Asia',
'Southern Asia',

'World')
