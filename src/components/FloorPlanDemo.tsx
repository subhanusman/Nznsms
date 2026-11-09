import React, { useState } from 'react';
import { Maximize2, Layers, CheckCircle2, Info } from 'lucide-react';
import { Property, RoomDetail } from '../types/property';

interface FloorPlanDemoProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (id: string) => void;
  onOpenScheduler?: (propertyId: string) => void;
}

export const FloorPlanDemo: React.FC<FloorPlanDemoProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onOpenScheduler,
}) => {
  const [activePropertyId, setActivePropertyId] = useState<string>(
    selectedPropertyId || properties[0]?.id || 'azure-coast-villa'
  );

  const activeProperty = properties.find((p) => p.id === activePropertyId) || properties[0];
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);
  const activeLevel = activeProperty?.floors[activeLevelIndex] || activeProperty?.floors[0];
  const [activeRoom, setActiveRoom] = useState<RoomDetail | null>(
    activeLevel?.rooms[0] || null
  );

  const handlePropertyChange = (newId: string) => {
    setActivePropertyId(newId);
    setActiveLevelIndex(0);
    const prop = properties.find((p) => p.id === newId);
    if (prop?.floors[0]?.rooms[0]) {
      setActiveRoom(prop.floors[0].rooms[0]);
    } else {
      setActiveRoom(null);
    }
    if (onSelectProperty) onSelectProperty(newId);
  };

  const handleLevelChange = (index: number) => {
    setActiveLevelIndex(index);
    const level = activeProperty?.floors[index];
    if (level && level.rooms.length > 0) {
      setActiveRoom(level.rooms[0]);
    } else {
      setActiveRoom(null);
    }
  };

  if (!activeProperty || !activeLevel) return null;

  return (
    <section id="floor-plans" className="py-16 lg:py-24 bg-[#F5F2EA] border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0DCD3]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
              <span>Architectural Blueprint Laboratory</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Space Planning</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              Floor Plan & Spatial Demonstrations
            </h2>
            <p className="mt-2 text-sm text-[#5C574F] max-w-xl">
              Inspect spatial flows, structural dimensions, room layouts, and custom finishes across high-end residential estates and commercial floors.
            </p>
          </div>

          {/* Property Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#736E66] mr-1">
              Select Asset:
            </span>
            <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-[#DDD9CE]">
              {properties.slice(0, 4).map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => handlePropertyChange(prop.id)}
                  className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                    activePropertyId === prop.id
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-[#5C574F] hover:text-[#1A1A1A]'
                  }`}
                >
                  {prop.title.split(' ')[1] || prop.title.slice(0, 16)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Level Navigation Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#9E7B3B]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Active Level:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeProperty.floors.map((fl, idx) => (
                <button
                  key={fl.levelId}
                  onClick={() => handleLevelChange(idx)}
                  className={`px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                    activeLevelIndex === idx
                      ? 'border-[#9E7B3B] bg-white text-[#1A1A1A] shadow-xs'
                      : 'border-transparent text-[#6E685F] hover:text-[#1A1A1A]'
                  }`}
                >
                  {fl.levelName}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#706B62] tabular-nums">
            Level Gross Area: <strong className="text-[#1A1A1A] font-medium">{activeLevel.totalAreaSqFt.toLocaleString()} sq ft</strong>
          </div>
        </div>

        {/* Blueprint Canvas & Specification Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Blueprint Interactive Display Area */}
          <div className="lg:col-span-8 bg-[#18191C] border border-[#2B2D33] p-6 text-white relative min-h-[440px] flex flex-col justify-between overflow-hidden shadow-sm">
            {/* Architectural Grid Background Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#C5A059 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px, 48px 48px, 48px 48px',
              }}
            />

            {/* Blueprint Header Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs border-b border-white/10 pb-3">
              <div>
                <span className="text-[#D4AF37] uppercase tracking-wider font-mono text-[11px]">
                  ARCH_SPEC // {activeProperty.architecturalStyle}
                </span>
                <h4 className="text-sm font-semibold tracking-wide text-white mt-0.5">
                  {activeLevel.levelName}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <span className="font-mono text-[11px] tabular-nums">SCALE 1:100</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[11px]">DEMO RENDERING</span>
              </div>
            </div>

            {/* Simulated 2D Architectural Room Map */}
            <div className="relative z-10 my-8 py-6 w-full flex-1 flex flex-col justify-center">
              <div className="relative w-full aspect-[16/9] border-2 border-[#D4AF37]/40 bg-[#121316]/80 p-4">
                {/* Structural boundary guides */}
                <div className="absolute inset-2 border border-white/10" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-white/10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-l border-dashed border-white/10 pointer-events-none" />

                {/* Hotspot room markers */}
                {activeLevel.rooms.map((room) => {
                  const isSelected = activeRoom?.id === room.id;
                  return (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoom(room)}
                      style={{
                        left: `${room.xPercent}%`,
                        top: `${room.yPercent}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-none transition-all cursor-pointer z-20 group text-left ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#121316] ring-2 ring-white'
                          : 'bg-[#22242A] hover:bg-[#2F323B] text-white border border-[#444854]'
                      }`}
                      aria-label={`Inspect ${room.name}`}
                    >
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <div
                          className={`w-2 h-2 ${
                            isSelected ? 'bg-black' : 'bg-[#D4AF37]'
                          }`}
                        />
                        <span className="text-xs font-medium tracking-wide">
                          {room.name}
                        </span>
                      </div>
                      <div
                        className={`text-[10px] tabular-nums ${
                          isSelected ? 'text-[#121316]' : 'text-stone-400'
                        }`}
                      >
                        {room.dimensions}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blueprint Footer / Compass & Legend */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-4">
                <span>Click markers above to inspect detailed room engineering & finishes.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#D4AF37]">N 43°33'18" E 7°7'44"</span>
              </div>
            </div>
          </div>

          {/* Active Room Specification Card */}
          <div className="lg:col-span-4 bg-white border border-[#E5E1D8] p-6 shadow-sm flex flex-col justify-between h-full">
            {activeRoom ? (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#9E7B3B] font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Selected Room Specification</span>
                </div>

                <h3 className="mt-2 font-serif-luxury text-2xl font-normal text-[#1A1A1A]">
                  {activeRoom.name}
                </h3>

                <p className="mt-2 text-xs text-[#5C574F] leading-relaxed">
                  {activeRoom.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 py-4 border-y border-[#ECE8DF]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">
                      Dimensions
                    </span>
                    <span className="text-sm font-medium text-[#1A1A1A] tabular-nums">
                      {activeRoom.dimensions}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">
                      Enclosed Area
                    </span>
                    <span className="text-sm font-medium text-[#1A1A1A] tabular-nums">
                      {activeRoom.areaSqFt.toLocaleString()} sq ft
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A746B] font-semibold block mb-2">
                    Architectural Finishes & Materials
                  </span>
                  <ul className="space-y-2 text-xs text-[#3D3A35]">
                    {activeRoom.finishes.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#706B62]">
                Select a room hotspot from the blueprint canvas.
              </div>
            )}

            <div className="mt-8 pt-5 border-t border-[#ECE8DF]">
              <button
                onClick={() => onOpenScheduler && onOpenScheduler(activeProperty.id)}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Viewing For This Asset</span>
                <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
