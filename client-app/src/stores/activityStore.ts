import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../interfaces/Activity";
import { v4 as uuid } from "uuid";
import { runInAction } from "mobx";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  highlightedActivity: Activity | undefined = undefined;
  isFormOpen = false;
  isLoading = false;
  isLoadingInitial = false;
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  setLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };

  loadActivities = async () => {
    this.isLoadingInitial = true;

    try {
      const activities = await agent.Activities.list();

      activities.forEach((a) => {
        this.setActivity(a);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    this.isLoadingInitial = true;

    const activity = this.getActivity(id);

    if (activity) {
      this.highlightedActivity = activity;
      this.isLoadingInitial = false;
      return activity;
    }

    try {
      const activityFromDB = await agent.Activities.details(id);

      console.log(activityFromDB);

      runInAction(() => {
        this.setActivity(activityFromDB);
        this.highlightedActivity = activityFromDB;
        this.isLoadingInitial = false;
      });
      return activityFromDB;
    } catch (err) {
      console.log(err);
      this.isLoadingInitial = false;
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  createActivity = (activity: Activity) => {
    return new Promise<string>((resolve) => {
      this.isSubmitting = true;
      const id = uuid();
      const newActivity = { ...activity, id: id };

      agent.Activities.create(newActivity).then(() => {
        runInAction(() => {
          this.activityRegistry.set(newActivity.id, newActivity);
          this.isSubmitting = false;
          this.isFormOpen = false;
          resolve(id);
        });
      });
    });
  };

  updateActivity = (activity: Activity) => {
    return new Promise<string>((resolve) => {
      this.isSubmitting = true;

      agent.Activities.update(activity).then(() => {
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.highlightedActivity = activity;
          this.isFormOpen = false;
          this.isSubmitting = false;

          resolve(activity.id);
        });
      });
    });
  };

  deleteActivity = (id: string) => {
    this.isSubmitting = true;

    agent.Activities.delete(id).then(() => {
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.isSubmitting = false;
      });
    });
  };
}
