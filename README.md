# rails-testing

My testing Rails app to explore Ruby on Rails development workflow.

## Findings:

### Live reload in development

`rails_live_reload` can be used without dependencies to live reload Rails during development

To Install:

```sh
bundle add rails_live_reload --group development
rails generate rails_live_reload:install
```

### ./bin/dev not working with auto-installed foreman

`./bin/dev`

```
bundle add foreman --group development
```

Into `./bin/dev`:

```sh
#!/usr/bin/env sh

bundle exec foreman start -f Procfile.dev "$@"
```
