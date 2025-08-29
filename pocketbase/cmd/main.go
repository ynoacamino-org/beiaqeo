package main

import (
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "github.com/ynoacamino-org/beiaqeo/pocketbase/migrations"
	"github.com/ynoacamino-org/beiaqeo/pocketbase/routes"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})


	app.OnServe().BindFunc(routes.Register)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
