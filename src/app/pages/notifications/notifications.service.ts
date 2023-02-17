import { Injectable } from '@angular/core';
import { NotificationControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private readonly _notificationService: NotificationControllerService) { }

  getNotificationForParticularOwner(id: number, jobId: string) {
    return this._notificationService.getNotificationForParticularOwner({ ownerId: id, jobId: jobId });
  }

  getOwnerNotification(id: number) {
    return this._notificationService.ownerNotification({ id: id });
  }

  getSeekerNotification(id: number) {
    return this._notificationService.seekerNotification({ id: id });
  }
}
