package routes

import "github.com/pocketbase/pocketbase/core"

func Register(se *core.ServeEvent) error {
	AuthCallback(se)
	WellKnown(se)

	return se.Next()
}
