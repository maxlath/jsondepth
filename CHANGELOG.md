# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 1.7.0 - 2017-02-19
When no value could be found, returns an error code to signal so that commands such as the following can work:
```
cat package.json | jd nonexistingkey || echo 'key not found, do something else then'
```
