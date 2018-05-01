# jsondepth
A small command-line tool to walk through the depth levels of a json objects

`output json | jd <PATH>=. <DEPTH>=0`

![screenshot](https://cloud.githubusercontent.com/assets/1596934/19417977/b2025c36-93ba-11e6-85fa-6bd274eb6be4.png)

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
      - [`_values`](#_values)
      - [`_map`](#_map)
  - [Format the output as valid JSON](#format-the-output-as-valid-json)
  - [Parse newline delimited JSON](#parse-newline-delimited-json)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation
Working with super deep json objects from the terminal is a pain, unless you use a good json parser.<br>
[jq](https://github.com/stedolan/jq) is an awesome one, but doesn't handle object depths, afaik.<br>
Here the idea is to **walk through a json object as you would read a summary**: level by level.

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

```sh
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
# or with keys with spaces
curl -s "$url" | jd .entities.Q1.['a key with spaces']
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
##### `_values`
apply `_.values` to an array
```sh
curl -s "$url" | jd entities._values
# => [{ id: 'Q1', etc...}]
curl -s "$url" | jd entities._values.0.id
# => 'Q1'
```
##### `_map`
map properties of an array
```sh
curl -s "$url" | jd entities._values._map.id
# => ['Q1']
```
##### `_first`
```sh
echo '["foo", "bar"]' | jd ._first
# => foo
```

##### `_last`
```sh
echo '["foo", "bar"]' | jd ._first
# => bar
```

### Format the output as valid JSON
Wrapped results like `{ entities: { Q1: [Object] }, success: 1 }` are more readible but aren't valid JSON. And sometimes, for whatever reason, you want a valid JSON output; there in a option for that: `--json|-j`
```
curl -s "$url" | jd entities.Q1.aliases --json
```
You can even specify the output indentation level (Between 0 and 9. Default: 2):
```
curl -s "$url" | jd entities.Q1.aliases --json=0
curl -s "$url" | jd entities.Q1.aliases --json=4
```

Notice that it disables the depth option as it's responsible for the wrapping mechanism.

### Parse newline delimited JSON
When the input is [newline delimited JSON](http://ndjson.org/), filters are applied line by line.
