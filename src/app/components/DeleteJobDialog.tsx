'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { deleteJob } from "@/lib/actions/jobs";

import type { JobRow } from "./ManageJobsTable";

import { toast } from "@/components/ui/toast";

export function DeleteJobDialog({ job }: { job: JobRow }) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setError(null);
        setIsDeleting(true);

        const result = await deleteJob(job.id);

        setIsDeleting(false);

        if (!result.success) {
            const message = result.error || "Failed to delete the job. Please try again.";

            setError(message);
            toast.add({
                type: "error",
                title: "Failed to delete job",
                description: message,
            });
            return;
        }

        // Job removed from MongoDB — refetch the server-rendered list
        setOpen(false);
        toast.add({
            type: "success",
            title: "Job deleted!",
            description: `${job.title} has been deleted successfully.`,
        });
        router.refresh();
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) setError(null);
            }}
        >
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${job.title}`}
                        className="text-[#85858f] hover:bg-[#421b1b]/60 hover:text-[#f87171]"
                    />
                }
            >
                <Trash2 className="size-3.5" />
            </AlertDialogTrigger>

            <AlertDialogContent
                size="sm"
                className="border border-[#2a2a2e] bg-[#1a1a1f] text-[#e4e4e7] ring-[#2a2a2e]"
            >
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-[#421b1b]/60 text-[#f87171]">
                        <Trash2 className="size-5" />
                    </AlertDialogMedia>

                    <AlertDialogTitle className="text-[#e4e4e7]">
                        Delete job post?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-[#a1a1aa]">
                        This will permanently delete{" "}
                        <span className="font-medium text-[#e4e4e7]">
                            {job.title}
                        </span>{" "}
                        and remove it from your job listings. This action cannot
                        be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {error && (
                    <p className="rounded-lg border border-[#872e2e] bg-[#421b1b]/60 px-3 py-2 text-xs text-[#f87171]">
                        {error}
                    </p>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isDeleting}
                        className="border-[#2a2a2e] bg-[#0f0f11] text-[#e4e4e7] hover:bg-[#222226]"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-[#b91c1c] text-white hover:bg-[#991b1b]"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}