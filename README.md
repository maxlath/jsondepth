# jsondepth
A small command-line tool to walk through the depth levels of a json objects

`output json | jd <PATH>=. <DEPTH>=0`

![screenshot](https://cloud.githubusercontent.com/assets/1596934/19417977/b2025c36-93ba-11e6-85fa-6bd274eb6be4.png)

You can think of it as a wrapper of [`_.get`](https://lodash.com/docs#get) (for the path) and [`util.inspect`](https://nodejs.org/api/util.html#util_util_inspect_object_options) (for the depth)

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Motivation](#motivation)
- [Installation](#installation)
- [How-to](#how-to)
  - [Specify a depth level](#specify-a-depth-level)
  - [Specify a path](#specify-a-path)
  - [Specify a depth and a path](#specify-a-depth-and-a-path)
  - [Access JS objects attributes](#access-js-objects-attributes)
    - [Native attributes](#native-attributes)
      - [Arrays `length`](#arrays-length)
    - [Special keys](#special-keys)
      - [`_keys`](#_keys)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation
Working with super deep json objects from the terminal is a pain, unless you use a good json parser.<br>
[jq](https://github.com/stedolan/jq) is an awesome one, but doesn't handle object depths, afaik.<br>
Here the idea is to **walk through a json object as you would read a summary**: level by level.

The only downside being that the output might not be valid json, due to the wrapped object, but that's a fair price for readability while exploring a data set.

## Installation

```sh
npm install -g jsondepth
```
## How-to

real world example:
```sh
url='https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1&format=json'
curl -s "$url" | jsondepth
```
logs the object with only the first-level keys and values:
```js
{ entities: [Object], success: 1 }
```
for the sake of convenience and lazyness, **jsondepth is aliased to jd**
<br>
(which, purposedly make it look a bit like jq)
```
curl -s "$url" | jd
```

### Specify a depth level
this is equivalent to the two previous one:
```
curl -s "$url" | jd 0
```
<hr>
now let's go one-level deeper:
```
curl -s "$url" | jd 1
```
outputs:
```js
{ entities: { Q1: [Object] }, success: 1 }
```
<hr>
![we need to go deeper](http://vignette3.wikia.nocookie.net/glee/images/6/6f/We-need-to-go-deeper_inception.jpg/revision/latest)
```sh
curl -s "$url" | jd 2
curl -s "$url" | jd 3
curl -s "$url" | jd 4
# etc
```
<hr>
If you use [paths](#specify-a-path), you may wish to disable object wrapping: this can be done by passing `-1`. The advantage is that you are sure to get back a valid json object.
```sh
curl -s "$url" | jd -1
```

### Specify a path
```sh
curl -s "$url" | jd entities.Q1.aliases.fi.1
# or to mimick jq syntax
curl -s "$url" | jd .entities.Q1.aliases.fi.1
```

### Specify a depth and a path
if both a path and a depth are specified, **path should come first, depth second**
```sh
curl -s "$url" | jd entities.Q1.claims.P31.0 3
```

### Access JS objects attributes
#### Native attributes
##### Arrays `length`
```sh
curl -s "$url" | jd entities.Q1.aliases.en.length
# => 5
```
#### Special keys
##### `_keys`
apply `Object.keys` to the final object
```sh
curl -s "$url" | jd entities._keys
# => ['Q1']
```
