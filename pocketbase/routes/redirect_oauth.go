package routes

import "github.com/pocketbase/pocketbase/core"

func RedirectOAuth(se *core.ServeEvent) {
	se.Router.GET("/redirect-oauth/{provider}", func(e *core.RequestEvent) error {
		provider := e.Request.PathValue("provider")

		if provider != "google" {
			return e.NotFoundError("Provider not supported", nil)
		}

		return e.Redirect(302, "beiaqeo://auth/callback")
	})
}
