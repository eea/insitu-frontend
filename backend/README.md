To start working and bring the sources:

```bash
docker-compose exec backend bash
bin/mxdev -c src/mxdev.ini
bin/pip install -r src/requirements-mxdev.txt
bin/zope-testrunner --test-path sources/clms.types
```
