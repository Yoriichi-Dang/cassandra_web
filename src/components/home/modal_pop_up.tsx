import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useState } from 'react';
export function ModalPopUp({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <FontAwesomeIcon icon={faChartSimple} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1100px]">
          <DialogHeader>
            <DialogTitle>Rating Overview</DialogTitle>
            <DialogDescription>
              Get a quick overview of the star rating reviews for this product.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogHeader>
          <DialogTitle>Rating Overview</DialogTitle>
          <DialogDescription>
            Get a quick overview of the star rating reviews for this product.
          </DialogDescription>
        </DialogHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
