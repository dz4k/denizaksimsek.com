export const url = "/.well-known/webfinger";
export default () => JSON.stringify({
    "subject": "acct:dz4k@indieweb.social",
    "aliases":
    [
        "https://indieweb.social/@dz4k",
        "https://indieweb.social/users/dz4k"
    ],
    "links":
    [
        {
            "rel":"http://webfinger.net/rel/profile-page",
            "type":"text/html",
            "href":"https://indieweb.social/@dz4k"
        },
        {
            "rel":"self",
            "type":"application/activity+json",
            "href":"https://indieweb.social/users/dz4k"
        },
        {
            "rel":"http://ostatus.org/schema/1.0/subscribe",
            "template":"https://indieweb.social/authorize_interaction?uri={uri}"
        }
    ]
}, null, 2)