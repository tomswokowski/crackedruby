import { application } from 'controllers/application'
import { eagerLoadControllersFrom } from '@hotwired/stimulus-loading'

// auto‑load local controllers
eagerLoadControllersFrom('controllers', application)

// Import & Register the Marksmith editor controllers
import { MarksmithController, ListContinuationController } from '@avo-hq/marksmith'
application.register('marksmith',         MarksmithController)
application.register('list-continuation', ListContinuationController)
