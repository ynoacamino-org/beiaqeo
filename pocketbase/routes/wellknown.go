package routes

import (
	"os"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func WellKnown(se *core.ServeEvent) {
	se.Router.GET("/.well-known/{path...}", apis.Static(os.DirFS("./routes/.well-known"), false) )
}
