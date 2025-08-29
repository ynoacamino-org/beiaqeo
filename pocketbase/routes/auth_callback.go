package routes

import "github.com/pocketbase/pocketbase/core"

func AuthCallback(se *core.ServeEvent) {
	se.Router.GET("/auth/callback", func(e *core.RequestEvent) error {
		provider := e.Request.PathValue("provider")

		if provider != "google" {
			return e.NotFoundError("Provider not supported", nil)
		}

		query := e.Request.URL.RawQuery

		redirectURL := "beiaqeo://auth/callback"
		if query != "" {
			redirectURL += "?" + query
		}

		return e.Redirect(302, redirectURL)
	})
}
