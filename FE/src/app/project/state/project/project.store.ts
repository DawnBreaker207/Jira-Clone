import { JProject } from '@/app/interface/project';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
export interface ProjectState extends JProject {}

function createInitialState(): ProjectState {
  return {
    issues: [],
    users: []
  } as ProjectState;
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'project'
})
export class ProjectStore extends Store<ProjectState> {
  constructor() {
    super(createInitialState());
  }
}
