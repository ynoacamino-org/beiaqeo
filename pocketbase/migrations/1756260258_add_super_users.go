package migrations

import (
	"errors"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		superusers, err := app.FindCollectionByNameOrId(core.CollectionNameSuperusers)
		if err != nil {
			return err
		}

		SUPERUSER_EMAILS := strings.Split(os.Getenv("SUPERUSER_EMAILS"), ",")
		SUPERUSER_PASSWORDS := strings.Split(os.Getenv("SUPERUSER_PASSWORDS"), ",")

		if len(SUPERUSER_EMAILS) == 0 || len(SUPERUSER_PASSWORDS) == 0 {
			return errors.New("SUPERUSER_EMAILS and SUPERUSER_PASSWORDS environment variables must be set")
		}

		if len(SUPERUSER_EMAILS) != len(SUPERUSER_PASSWORDS) {
			return errors.New("Number of superuser emails and passwords must match")
		}

		for i, email := range SUPERUSER_EMAILS {
			record := core.NewRecord(superusers)

			record.Set("email", email)
			record.Set("password", SUPERUSER_PASSWORDS[i])

			err := app.Save(record)
			if err != nil {
				return err
			}
		}

		return nil
	}, func(app core.App) error {
		SUPERUSER_EMAILS := strings.Split(os.Getenv("SUPERUSER_EMAILS"), ",")

		if len(SUPERUSER_EMAILS) == 0 {
			return errors.New("SUPERUSER_EMAILS environment variable must be set")
		}

		for _, email := range SUPERUSER_EMAILS {
			record, err := app.FindAuthRecordByEmail(core.CollectionNameSuperusers, email)
			if err != nil {
				continue
			}

			err = app.Delete(record)
			if err != nil {
				return err
			}
		}

		return nil
	})
}
