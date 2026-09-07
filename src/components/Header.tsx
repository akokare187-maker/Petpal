import React from 'react';
import { PawPrint, Bell, Plus, RefreshCw, Heart } from 'lucide-react';
import { Pet, Reminder } from '../types';

interface HeaderProps {
  pets: Pet[];
  activePet: Pet | null;
  reminders: Reminder[];
  onOpenAddPet: () => void;
  onOpenQuickLog: () => void;
  onSelectRemindersTab: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePet,
  reminders,
  onOpenAddPet,
  onOpenQuickLog,
  onSelectRemindersTab,
  onResetDemo,
}) => {
  // Count pending reminders for current pet or across all pets
  const pendingCount = reminders.filter(
    (r) => !r.isCompleted && (activePet ? r.petId === activePet.id : true)
  ).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-200">
            <PawPrint className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-stone-900 font-display">
                Pet<span className="text-amber-500">Pal</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Care Hub
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Cute, friendly, and complete pet organizer
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification bell */}
          <button
            id="header-reminder-button"
            type="button"
            onClick={onSelectRemindersTab}
            className="relative p-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-amber-50/80 transition-colors cursor-pointer"
            title="View reminders"
            aria-label="View reminders"
          >
            <Bell className="w-5 h-5" />
            {pendingCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Quick Log Action */}
          <button
            id="header-quick-log-button"
            type="button"
            onClick={onOpenQuickLog}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-semibold rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Quick Log</span>
          </button>

          {/* Add Pet */}
          <button
            id="header-add-pet-button"
            type="button"
            onClick={onOpenAddPet}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-all cursor-pointer shadow-sm active:scale-98"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Add Pet</span>
          </button>

          {/* Reset Demo Data dropdown or button */}
          <button
            id="header-reset-demo-button"
            type="button"
            onClick={() => {
              if (window.confirm('Reset app data back to friendly demo pets?')) {
                onResetDemo();
              }
            }}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            title="Reset to Sample Pets"
            aria-label="Reset to Sample Pets"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
