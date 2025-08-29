package routes

import "github.com/pocketbase/pocketbase/core"

func AuthCallback(se *core.ServeEvent) {
	se.Router.GET("/auth/callback", func(e *core.RequestEvent) error {
		query := e.Request.URL.RawQuery

		redirectURL := "beiaqeo://auth/callback"
		if query != "" {
			redirectURL += "?" + query
		}

		return e.Redirect(302, redirectURL)
	})
}
