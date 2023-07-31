---
title: Programming on an Android tablet
date: 2023-07-01 22:53
---

I recently purchased a Samsung Galaxy Tab S7 FE.
I wasn't planning on making it a laptop replacement,
but I had some experience with Android's capabilities for development
(from when I only had a phone)
and the possibility was irresistible.

SSH into my laptop was a no-go.
I have no idea how to expose my laptop to the internet in a way that works,
let alone is safe.
Besides, my model didn't have mobile data support for on-the-go.
I wanted to run a Linux dev environment on the tablet itself.

![The tablet, in a magnetic stand case, with a keyboard in front of it, on a desk](/assets/photos/tablet-programming.jpg)

## Termux

> Termux is an Android terminal emulator and Linux environment app
> that works directly with no rooting or setup required.
> A minimal base system is installed automatically -
> additional packages are available using the APT package manager.

-- <https://termux.dev>

Termux is not a VM, container or emulator --
it's a terminal in the host system.
Because the places where a Linux distro would usually install software
are write-only on an Android device,
Termux places software and your home directory inside its data directory
(`TODO`)
and uses the `$PREFIX` environment variable.

In my experience, this works until it doesn't.
Software in the Termux repositories works as expected,
but anything that needs to be built locally or piped to `sh` from an URL
will likely be confused by the odd directory structure.

In my phone-only days, this worked fine.
However, I have projects now that depend on software not packaged for Termux.

Can't I just have a container or something?

## PRoot-Distro

> PRoot is a user-space implementation of chroot, mount --bind, and binfmt_misc.

I'm not super clear on the details,
but it seems that Android doesn't let you do most of the things you need for a
container runtime.
PRoot is a solution to that.

The Termux project maintains a fork of PRoot as well as a wrapper program
called PRoot-Distro.
PRoot-Distro has an interface that will be familiar to anyone who has used
Distrobox or toolbx:

```
proot-distro create fedora
proot-distro login fedora
```

This drops you into a fully-functional Fedora shell.
After my previous failed attempts, I was surprised to see how well it works:

 - You can access the network
   (this didn't work with another PRoot solution I tried --
   something to do with Android not allowing raw DNS traffic?)
 - You can start a server on the container and access it from the host
 - You can access the host Android filesystem
   (not the Termux home, the one that has your pictures and
   WhatsApp voice messages) from the container through the `/storage` directory

One thing to note is you are still on an ARM device.
Software that is not compiled for ARM will not work.
However, I only hit this once while installing Deno --
and even then, ARM builds are available through a fork.

## Summary

- Install Termux

- Install PRoot-Distro
  ```
  pkg install proot-distro
  ```

- Set up a container
  ```
  proot-distro create fedora
  ```

- Enter your container
  ```
  proot-distro login fedora
  ```

## Hardware

- Samsung Galaxy Tab S7 FE SM-T733
- Ztotop Magnetic Case
- Logitech K380 Bluetooth Keyboard
