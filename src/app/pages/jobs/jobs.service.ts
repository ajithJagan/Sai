import { Injectable } from '@angular/core';
import { JobControllerService, OwnerSkillDomainControllerService, OwnerSkillLevelAndExperienceControllerService, OwnerSkillTechnologiesControllerService, SeekerProjectControllerService, SkillSeekerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(
    private readonly jobController: JobControllerService,
    private readonly skillSeekerController: SkillSeekerControllerService,
    private readonly seekerProjectController: SeekerProjectControllerService,
    private readonly ownerSkillTechnologiesController: OwnerSkillTechnologiesControllerService,
    private readonly ownerSkillDomainController: OwnerSkillDomainControllerService,
    private readonly ownerSkillLevelAndExperienceController: OwnerSkillLevelAndExperienceControllerService,
  ) { }

  getRetrieveJob(Id: number) {
    return this.jobController.getJobDetails({ seekerId: Id });
  }

  getLocation(text: string) {
    return this.skillSeekerController.getLocationByKeyword({ keyword: text });
  }

  getTechnologyList() {
    return this.ownerSkillTechnologiesController.getDetailsTech();
  }

  getSeekerProjectDetails(id: number) {
    return this.seekerProjectController.seekerProjectDetails({ skillSeekerId: id });
  }

  getDomainList() {
    return this.ownerSkillDomainController.getDetails2();
  }

  getOwnerSkillYearOfExperienceDetails() {
    return this.ownerSkillLevelAndExperienceController.getOwnerSkillYearOfExperienceDetails();
  }

  getHiringPriority() {
    return this.jobController.getHiringPriority();
  }
}
