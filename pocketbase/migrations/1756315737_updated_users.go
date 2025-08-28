package migrations

import (
	"errors"
	"os"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		collection.AuthAlert.Enabled = false

		collection.OAuth2.Enabled = true

		GOOGLE_CLIENT_ID := os.Getenv("GOOGLE_CLIENT_ID")
		GOOGLE_CLIENT_SECRET := os.Getenv("GOOGLE_CLIENT_SECRET")

		if GOOGLE_CLIENT_ID == "" || GOOGLE_CLIENT_SECRET == "" {
			return errors.New("missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables")
		}

		collection.OAuth2.Providers = []core.OAuth2ProviderConfig{
			{
				Name:         "google",
				ClientId:     GOOGLE_CLIENT_ID,
				ClientSecret: GOOGLE_CLIENT_SECRET,
			},
		}

		collection.PasswordAuth.Enabled = false

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		collection.AuthAlert.Enabled = true

		collection.OAuth2.Enabled = false
		collection.OAuth2.Providers = []core.OAuth2ProviderConfig{}

		collection.PasswordAuth.Enabled = true

		return app.Save(collection)
	})
}
