package routes

import "github.com/pocketbase/pocketbase/core"

func Register(se *core.ServeEvent) error {
	RedirectOAuth(se)

	return se.Next()
}
