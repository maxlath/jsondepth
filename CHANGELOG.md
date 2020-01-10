# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 2.0.0 - 2020-01-10
BREAKING CHANGE: require Node v8 or higher

## 1.9.0 - 2018-05-01
Added _first and _last special keys

## 1.8.0 - 2017-12-08
Shows a help menu when the command is called without argument or stdin

## 1.7.0 - 2017-02-19
When no value could be found, returns an error code to signal so that commands such as the following can work:
```
cat package.json | jd nonexistingkey || echo 'key not found, do something else then'
```
