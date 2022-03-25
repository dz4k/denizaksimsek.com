#!/usr/bin/env bash

set -e

cd $(dirname $0)/..

targetHref="$(zenity \
	--title "Interact" \
	--text "Enter page to interact with" \
	--entry "URL" \
)"

targetMF2J="$(./_cms/mf2.ts $targetHref)"
targetName="$(jq '.properties.name[0]' <<<"$targetMF2J")"
targetLang="$(jq '.lang' <<<"$targetMF2J")"

interactionType="$(zenity \
	--title "Interaction type" \
	--text "like, reply, repost" \
	--entry "Type" \
)"

case "$interactionType" in
	like)
		cat >entries/interact/$(date +"%Y-%m-%d-%H-%M-%S").yaml <<-EOF
		like of:
		  name: $targetName
		  url: $targetHref
		  lang: $targetLang
EOF
	;;
	reply)
		replyContents="$(zenity --text-info --editable)"
		cat >entries/interact/$(date +"%Y-%m-%d-%H-%M-%S").md <<-EOF
		---
		in reply to:
		  name: $targetName
		  url: $targetHref
		  lang: $targetLang
		---

		$replyContents
EOF
	;;
	repost)
		repostContents="$(
			jq '.properties.content[0].html' <<<"$targetMF2J" --raw-output | \
			pandoc -f html -t markdown | \
			tee /dev/stderr | \
			zenity --text-info --editable
		)"
		cat >entries/interact/$(date +"%Y-%m-%d-%H-%M-%S").md <<-EOF
		---
		repost of:
		  name: $targetName
		  url: $targetHref
		  lang: $targetLang
		---

		$repostContents
EOF
	;;
	*)
		zenity --message "No such interaction type: $interactionType"
	;;
esac
