# Crossplatform LTI Plugin Frontend

Purpose: to use in [ORCA LTI Moodle Plugin](https://github.com/orca-nrw/crossplatform-moodle-lti-plugin/) 
and in [ORCA LTI ILIAS Plugin](https://github.com/orca-nrw/crossplatform-ilias-lti-plugin) as a frontend.

Developed as a part of the ORCA.NRW Project in collaboration with:
* Ruhr-Universität Bochum
* metromorph softworks GmbH
* Ampada GmbH
* Moodle Community
* ILIAS Community

##How to build

* Checkout a TARGET plugin (Moodle or ILIAS). Example: `git clone git@github.com:orca-nrw/crossplatform-moodle-lti-plugin.git`
* Go to the root directory of the target plugin. Example: `cd crossplatform-moodle-plugin`
* Checkout this plugin to a directory `clientapp` in the target plugin: `git clone git@github.com:orca-nrw/crossplatform-lti-plugin.git clientapp`
* Go to the `clientapp` directory: `cd clientapp`
* Install dependencies: `npm i`
* Build this plugin. Command line for Moodle: `npm run build-prod-moodle`. For ILIAS: `npm run build-prod-ilias`
* You should find compiled frontend files in the target plugin directory. The directory `clientapp` is not needed for executing the target plugin and can be deleted.
