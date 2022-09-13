---
title: VSCode/Toolbx
date: 2021-11-17 20:53:00
---

A GUI script to run VSCode in a toolbox container.

***

Recently, I switched to [Fedora Silverblue] as my desktop operating system. To give a basic summary, Silverblue is an operating system where the system files are immutable, and can be restored to a previous state at any time. This version of Fedora does not ship the package manager `dnf`. Instead, you are expected to install applications in one of three ways:

-   [Flatpak]. These are applications with Android-like isolation and permission management capabilities.

    Flatpaks are nice, but there are still some rough edges (especially with less popular applications, where the packaging is not as well-maintained) and limitations (the VSCode terminal runs inside a container, and it's pretty inconvenient to use any of your tools).

-   [RPM-OSTree] allows you to "layer" packages onto the immutable image. The package installation creates a new image such that you can restore to a previous state of your system at any point.

    While it works, layering packages all the time is not ideal, and best reserved for things that don't work any other way. The docs give the `fish` shell as an example. I used it for a package that the internet told me to install to make Eduroam work. Layered packages don't take effect until a reboot.

-   [Toolboxes]! Toolbox, or Toolbx as it's been recently renamed[^1], is a tool for setting up development containers really easily.

    You type something to the effect of `toolbox create my-project-container`, and you have a place where you can `sudo` without password, install whatever package with `dnf`, just trash the place. The containers use your real home directory, can access USB devices, and other things that <i>just work</i>. If anything goes wrong, you can just create a new container and start over.

## Toolbx

I set up toolboxes for a few projects to test the waters:

- `www`: This website
- `_hyperscript`: The hypermedia programming language
- `this-week-in-htmx`: The weekly blog that I was running late on at the time. Sorry...

Great, I'm all set up!

So... How do I develop in here?

Some DDGing led me to the amazing [`toolbox-vscode`] script. It gives you a script that you can place into `~/.local/bin/code`. The first time you run it, it sets up everything for connecting to the container via VSCode's remote feature, and launches it. The setup needs to be performed once per container, which wasn't the most convenient, but oh well.

## In which I have to have my GUIs

Previously, I would launch VSCode and pick my project from the <kbd>Open Recent</kbd> menu. The flow of

- opening a terminal
- entering the toolbox
- entering the project folder
- <kbd>code .</kbd>
- now I can code, but I'm left with a useless terminal open

was far too janky. What I wanted was:

- launch an app
- pick my project from a list
- VSCode is open to the right toolbox and project directory, and the list is out of my way

After some relearning Bash and overengineering later, I have a script in my hands.

<details><summary><code>vstlbx</code></summary>

  ~~~ bash
  #!/usr/bin/env bash

  # Depends on: bash zenity

  set -e

  Title="VS Toolbx"
  Text="Select a container to open in VS Code:"

  ## list-containers > containers
  list-containers() {
  	toolbox list --containers | tail -n +2 | tr -s ' +' "\t" | cut -f 2
  }

  ## containers | user-pick-container > container
  user-pick-container() {
  	zenity \
  		--title "$Title" \
  		--text "$Text" \
  		--list \
 		--column 'Name' \
 		--hide-header \
 		2>/dev/null
  }

  ## get-project-dir container > project
  get-project-dir() {
  	if [ "$1" == "hyperscript" ]; then
  		echo "$HOME/Projects/_hyperscript"
  	else
  		echo "$HOME/Projects/$1"
  	fi
  }

  ## run-container container
  run-container() {
  	toolbox run --container "$1" -- $(which code) $(get-project-dir "$1")
  }

  ## run-ui
  run-ui() {
  	container=$(list-containers | user-pick-container)
  	run-container "$container"
  }

  install-desktop-file() {
  	desktop_file="$HOME/.local/share/applications/com.dz4k.vstlbx.desktop"
  	cat <<-EOF >"$desktop_file"
  		[Desktop Entry]
  		Type=Application
  		Name[en_US]=VS/Toolbx
  		Categories=Development;
  		X-GNOME-FullName[en_US]=VS/Toolbx
  		Comment[en_US.UTF-8]=Attach VSCode to toolboxes
  		NoDisplay=false
  		Exec=/var/home/deniz/Applications/vstlbx
  		Path=.
  		Terminal=false
  		X-GNOME-UsesNotifications=false
 		StartupWMClass=zenity
  		Name[en_US.UTF-8]=VS/Toolbx
  		X-GNOME-FullName[en_US.UTF-8]=VS/Toolbx
  	EOF
  }

  if [ "$#" == 0 ]; then
  	run-ui
  	exit 0
  fi

  while [ "$#" -gt 0 ]; do
  	case "$1" in
  		'install-desktop')
  			install-desktop-file
  		;;
  		'container')
  			run-container "$2"
  			shift
  		;;
  		'ui')
  			run-ui
  		;;
  	esac
  	shift
  done
  ~~~

 <small>who needs Gists anyway</small>

</details>

Here's what the UI looks like:

![A dialog with a list of container names: fedora-toolbox-35, hyperscript, this=week-in-htmx, www](/assets/photos/vstlbx.png)

I'm still getting myself set up, but I'm happy that I figured this part out early on.
