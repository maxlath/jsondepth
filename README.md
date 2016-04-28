#jsondepth
a small command-line tool to walk through the depth levels of a json objects

##Motivation
Working with super deep json objects from the terminal is a pain, unless you use a good json parser.<br>
[jq](https://github.com/stedolan/jq) is an awesome one, but doesn't handle object depths, afaik.<br>
Here the idea is to **walk through a json object as you would read a summary**: level by level.

##Installation

```sh
npm install -g jsondepth
```
##How-to

real world example:
```sh
url=https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1&format=json
curl -s $url | jsondepth
```
logs the object with only the first-level keys and values:
```js
{ entities: [Object], success: 1 }
```
for the sake of convenience and lazyness, **jsondepth is aliased to jd**
<br>
(which, purposedly make it look a bit like jq)
```
curl -s $url | jd
```

###Specify a depth level
this is equivalent to the two previous one:
```
curl -s $url | jd 0
```
<hr>
now let's go one-level deeper:
```
curl -s $url | jd 1
```
outputs:
```js
{ entities: { Q1: [Object] }, success: 1 }
```
<hr>
![we need to go deeper](http://vignette3.wikia.nocookie.net/glee/images/6/6f/We-need-to-go-deeper_inception.jpg/revision/latest)
```
curl -s $url | jd 2
curl -s $url | jd 3
curl -s $url | jd 4
# etc
```

###Specify a path
```sh
curl -s $url | jd 'entities.Q1.aliases'
# or to mimick jq syntax
curl -s $url | jd '.entities.Q1.aliases'
```

###Specify a depth and a path
if both a path and a depth are specified, **path should come first, depth second**
```sh
curl -s $url | jd 'entities.Q1.claims' 3
```
