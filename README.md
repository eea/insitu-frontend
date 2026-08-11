# insitu-frontend

[![Release](https://img.shields.io/github/v/release/eea/insitu-frontend?sort=semver)](https://github.com/eea/insitu-frontend/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Finsitu-frontend%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto/job/insitu-frontend/job/master/lastBuild/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Finsitu-frontend%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto/job/insitu-frontend/job/develop/lastBuild/display/redirect)
[![Release pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Finsitu-frontend%2F2.44.0&build=last&subject=release%20v2.44.0%20pipeline)](https://ci.eionet.europa.eu/view/Github/job/volto/job/insitu-frontend/job/2.44.0/lastBuild/display/redirect/)


## Documentation

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).


## Getting started

1. Install `nvm`

        touch ~/.bash_profile
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

        source ~/.bash_profile
        nvm version

1. Install latest `NodeJS 16.x`:

        nvm install 16
        nvm use 16
        node -v
        v16.16.2

1. Install `yarn`

        curl -o- -L https://yarnpkg.com/install.sh | bash
        yarn -v

1. Clone:

        git clone https://github.com/eea/insitu-frontend.git
        cd insitu-frontend

1. Install

        yarn build

1. Start backend

        docker-compose up -d
        docker-compose logs -f

1. Start frontend

        yarn start:prod

1. See application at http://localhost:3000

## Automated @eeacms dependencies upgrades

All the addon dependencies that are located in the dependencies section of `package.json` file that belong to @eeacms and have a `MAJOR.MINOR.PATCH` version are automatically upgraded on the release of a new version of the addon. This upgrade is done directly on the `develop` branch.

Exceptions from automated upgrades ( see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies for dependency configuration examples ) :
* All github or local paths
* Any version intervals ( `^version` or `>version` or `MAJOR.MINOR.x` etc )

## Release

See [release](https://github.com/eea/ims-frontend/tree/master/RELEASE.md)

## Production

We use [Docker](https://www.docker.com/), [Rancher](https://rancher.com/) and [Jenkins](https://jenkins.io/) to deploy this application in production.

### Deploy

* Within `Rancher > Catalog > EEA`

### Upgrade

* Within your Rancher environment click on the `Upgrade available` yellow button next to your stack.

TEST

* Confirm the upgrade

* Or roll-back if something went wrong and abort the upgrade procedure.

## Secret Scanning

This repository uses the Betterleaks GitHub Action to scan the current
repository content on every push and pull request. The scan uses the rules in
`.gitleaks.toml` and uploads a `betterleaks-report` artifact when a finding is
detected.

If the optional SMTP secrets are configured, failed scans also send an email to
the last commit committer. The workflow expects these repository or
organization secrets:

- `SMTP_URL`
- `SMTP_PORT` (optional, defaults to `25`)
- `SMTP_EMAIL`
- `SMTP_PASSWORD` (optional if the SMTP server does not require authentication)

Port `465` is sent with direct TLS; other ports use the default SMTP handshake.
The email includes a short finding summary from the redacted Betterleaks report,
including the redacted matched line from each finding.

There are three common outcomes:

1. **Everything is OK.** The `Betterleaks / Scan for secrets` check is green and
   no action is needed. Regular references to runtime values are OK, for example:

   ```js
   const tokenFromCookie = req.universalCookies.get('auth_token');
   ```

2. **A real secret was found.** The check is red and the workflow log asks you to
   download the `betterleaks-report` artifact. Open the artifact from the GitHub
   Actions run and check the reported file, line and rule. Remove the committed
   value, move it to the proper secret store, and rotate it if it was exposed.
   A report entry looks like this:

   ```json
   {
     "RuleID": "secret-literal-assignment",
     "File": "src/config.js",
     "StartLine": 12,
     "Secret": "[REDACTED]"
   }
   ```

3. **The finding is a false positive.** Keep the value only if it is clearly not
   sensitive, such as a test fixture, placeholder, or public example. Add
   `betterleaks:allow` on the same line and include a short explanation in the
   pull request.

   ```js
   const testPassword = 'admin'; //betterleaks:allow
   ```

   ```yaml
   password: "admin" #betterleaks:allow
   ```

Do not add `betterleaks:allow` to real credentials.
