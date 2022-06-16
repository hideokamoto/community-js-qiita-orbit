oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g community-js-qiita-orbit
$ orbit-qiita COMMAND
running command...
$ orbit-qiita (--version)
community-js-qiita-orbit/0.0.0 darwin-x64 node-v16.13.1
$ orbit-qiita --help [COMMAND]
USAGE
  $ orbit-qiita COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`orbit-qiita activities put KEYWORD`](#orbit-qiita-activities-put-keyword)
* [`orbit-qiita help [COMMAND]`](#orbit-qiita-help-command)
* [`orbit-qiita plugins`](#orbit-qiita-plugins)
* [`orbit-qiita plugins:install PLUGIN...`](#orbit-qiita-pluginsinstall-plugin)
* [`orbit-qiita plugins:inspect PLUGIN...`](#orbit-qiita-pluginsinspect-plugin)
* [`orbit-qiita plugins:install PLUGIN...`](#orbit-qiita-pluginsinstall-plugin-1)
* [`orbit-qiita plugins:link PLUGIN`](#orbit-qiita-pluginslink-plugin)
* [`orbit-qiita plugins:uninstall PLUGIN...`](#orbit-qiita-pluginsuninstall-plugin)
* [`orbit-qiita plugins:uninstall PLUGIN...`](#orbit-qiita-pluginsuninstall-plugin-1)
* [`orbit-qiita plugins:uninstall PLUGIN...`](#orbit-qiita-pluginsuninstall-plugin-2)
* [`orbit-qiita plugins update`](#orbit-qiita-plugins-update)
* [`orbit-qiita search members KEYWORD`](#orbit-qiita-search-members-keyword)
* [`orbit-qiita search posts KEYWORD`](#orbit-qiita-search-posts-keyword)

## `orbit-qiita activities put KEYWORD`

Put contenct creation activity to Orbit

```
USAGE
  $ orbit-qiita activities put [KEYWORD] [-d]

ARGUMENTS
  KEYWORD  Search keyword

FLAGS
  -d, --debug  Show process log

DESCRIPTION
  Put contenct creation activity to Orbit

EXAMPLES
  $ orbit-qiita activities put <keyword>: Put contenct creation activity to Orbit
```

## `orbit-qiita help [COMMAND]`

Display help for orbit-qiita.

```
USAGE
  $ orbit-qiita help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for orbit-qiita.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `orbit-qiita plugins`

List installed plugins.

```
USAGE
  $ orbit-qiita plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ orbit-qiita plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `orbit-qiita plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ orbit-qiita plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ orbit-qiita plugins add

EXAMPLES
  $ orbit-qiita plugins:install myplugin 

  $ orbit-qiita plugins:install https://github.com/someuser/someplugin

  $ orbit-qiita plugins:install someuser/someplugin
```

## `orbit-qiita plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ orbit-qiita plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ orbit-qiita plugins:inspect myplugin
```

## `orbit-qiita plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ orbit-qiita plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ orbit-qiita plugins add

EXAMPLES
  $ orbit-qiita plugins:install myplugin 

  $ orbit-qiita plugins:install https://github.com/someuser/someplugin

  $ orbit-qiita plugins:install someuser/someplugin
```

## `orbit-qiita plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ orbit-qiita plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ orbit-qiita plugins:link myplugin
```

## `orbit-qiita plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ orbit-qiita plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ orbit-qiita plugins unlink
  $ orbit-qiita plugins remove
```

## `orbit-qiita plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ orbit-qiita plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ orbit-qiita plugins unlink
  $ orbit-qiita plugins remove
```

## `orbit-qiita plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ orbit-qiita plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ orbit-qiita plugins unlink
  $ orbit-qiita plugins remove
```

## `orbit-qiita plugins update`

Update installed plugins.

```
USAGE
  $ orbit-qiita plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `orbit-qiita search members KEYWORD`

Search Orbit member by the username each source.

```
USAGE
  $ orbit-qiita search members [KEYWORD] [-f json|table] [-t <value>]

ARGUMENTS
  KEYWORD  Search keyword

FLAGS
  -f, --format=(json|table)  [default: json]
  -t, --target=<value>       [default: tag]

DESCRIPTION
  Search Orbit member by the username each source.

EXAMPLES
  $ orbit-qiita search members username -t twitter : search username from Twitter source

  $ orbit-qiita search members username -t Custom : search username from custom source

  $ orbit-qiita search members username -t Custom -f table : Show result as a table
```

## `orbit-qiita search posts KEYWORD`

search Qiita posts

```
USAGE
  $ orbit-qiita search posts [KEYWORD] [-f json|table] [-t <value>]

ARGUMENTS
  KEYWORD  Search keyword

FLAGS
  -f, --format=(json|table)  [default: json]
  -t, --target=<value>       [default: tag]

DESCRIPTION
  search Qiita posts

EXAMPLES
  $ orbit-qiita search posts qiita : search by tag

  $ orbit-qiita search posts qiita -f table : search by tag (table style)
```
<!-- commandsstop -->
