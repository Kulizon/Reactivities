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
        a.date = a.date.split("T")[0];
        this.activityRegistry.set(a.id, a);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  highlightActivity = (id: string) => {
    this.highlightedActivity = this.activityRegistry.get(id);
    this.isFormOpen = false;
  };

  cancelHighlightedActivity = () => {
    this.highlightedActivity = undefined;
  };

  openForm = () => {
    this.isFormOpen = true;
  };

  closeForm = () => {
    this.isFormOpen = false;
  };

  createActivity = (activity: Activity) => {
    this.isSubmitting = true;
    const newActivity = { ...activity, id: uuid() };

    agent.Activities.create(newActivity).then(() => {
      runInAction(() => {
        this.activityRegistry.set(newActivity.id, newActivity);
        this.isSubmitting = false;
        this.isFormOpen = false;
      });
    });
  };

  updateActivity = (activity: Activity) => {
    this.isSubmitting = true;

    agent.Activities.update(activity).then(() => {
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.highlightedActivity = activity;
        this.isFormOpen = false;
        this.isSubmitting = false;
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
