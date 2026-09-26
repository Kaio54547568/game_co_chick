import React, { useState } from 'react';
import { PlayerProfile, InventoryItem, ItemSlot } from '../types/game';
import { soundService } from '../services/sound';
import { Shield, Sword, Book, Package, X, Sparkles } from 'lucide-react';

interface InventoryModalProps {
  profile: PlayerProfile;
  onEquipItem: (item: InventoryItem) => void;
  onUnequipItem: (slot: 'weapon' | 'accessory' | 'manual') => void;
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  profile,
  onEquipItem,
  onUnequipItem,
  onClose,
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleSelectItem = (item: InventoryItem) => {
    setSelectedItem(item);
    soundService.playClick();
  };

  const handleEquip = () => {
    if (!selectedItem) return;
    soundService.playSwordSlash();
    onEquipItem(selectedItem);
    setSelectedItem(null);
  };

  const handleUnequip = (slot: 'weapon' | 'accessory' | 'manual') => {
    soundService.playClick();
    onUnequipItem(slot);
    setSelectedItem(null);
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'text-amber-400 border-amber-500 bg-amber-950/50';
      case 'epic':
        return 'text-purple-400 border-purple-500 bg-purple-950/50';
      case 'rare':
        return 'text-blue-400 border-blue-500 bg-blue-950/50';
      default:
        return 'text-stone-300 border-stone-600 bg-stone-900/50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-stone-900/95 border-2 border-amber-600/70 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-stone-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-200 font-wuxia">
                Hành Trang &amp; Thần Binh Trang Bị
              </h2>
              <p className="text-xs text-stone-400">
                Quản lý vũ khí, bảo vật và bí tịch nâng cao Công Lực
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          {/* Left: Equipped Slots & Player Stats */}
          <div className="p-4 border-r border-stone-800 overflow-y-auto space-y-4 bg-stone-950/50">
            {/* Total Stats */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-stone-400 border-b border-stone-800 pb-1.5">
                <span>Võ học căn bản</span>
                <span className="text-amber-400">Lv.{profile.stats.level}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-400">Sinh Lực:</span>
                  <span className="ml-1 font-bold text-rose-300">{profile.stats.maxHp}</span>
                </div>
                <div>
                  <span className="text-stone-400">Tấn Công:</span>
                  <span className="ml-1 font-bold text-amber-300">{profile.stats.attack}</span>
                </div>
                <div>
                  <span className="text-stone-400">Phòng Thủ:</span>
                  <span className="ml-1 font-bold text-blue-300">{profile.stats.defense}</span>
                </div>
                <div>
                  <span className="text-stone-400">Bạo Kích:</span>
                  <span className="ml-1 font-bold text-yellow-300">15%</span>
                </div>
              </div>

              {/* Cong Luc Highlight */}
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Công Lực:
                </span>
                <span className="text-base font-extrabold text-amber-200">
                  {profile.stats.congLuc}
                </span>
              </div>
            </div>

            {/* 3 Equipment Slots */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 block">
                Trang Bị Trên Người
              </span>

              {/* Weapon Slot */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-700 flex items-center justify-center overflow-hidden">
                    {profile.equipment.weapon ? (
                      <img src={profile.equipment.weapon.icon} alt="Weapon" className="w-8 h-8 object-contain" />
                    ) : (
                      <Sword className="w-5 h-5 text-stone-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">
                      {profile.equipment.weapon ? profile.equipment.weapon.name : 'Vũ Khí (Trống)'}
                    </span>
                    <span className="text-[10px] text-amber-400">
                      {profile.equipment.weapon ? `+${profile.equipment.weapon.stats.atkBonus} Tấn Công` : 'Chưa trang bị'}
                    </span>
                  </div>
                </div>

                {profile.equipment.weapon && (
                  <button
                    onClick={() => handleUnequip('weapon')}
                    className="text-[11px] text-stone-400 hover:text-red-400 px-2 py-1 rounded bg-stone-800 transition"
                  >
                    Tháo
                  </button>
                )}
              </div>

              {/* Accessory Slot */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-700 flex items-center justify-center overflow-hidden">
                    {profile.equipment.accessory ? (
                      <img src={profile.equipment.accessory.icon} alt="Accessory" className="w-8 h-8 object-contain" />
                    ) : (
                      <Shield className="w-5 h-5 text-stone-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">
                      {profile.equipment.accessory ? profile.equipment.accessory.name : 'Bảo Vật (Trống)'}
                    </span>
                    <span className="text-[10px] text-blue-400">
                      {profile.equipment.accessory ? `+${profile.equipment.accessory.stats.defBonus} Phòng Thủ` : 'Chưa trang bị'}
                    </span>
                  </div>
                </div>

                {profile.equipment.accessory && (
                  <button
                    onClick={() => handleUnequip('accessory')}
                    className="text-[11px] text-stone-400 hover:text-red-400 px-2 py-1 rounded bg-stone-800 transition"
                  >
                    Tháo
                  </button>
                )}
              </div>

              {/* Manual Slot */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-700 flex items-center justify-center overflow-hidden">
                    {profile.equipment.manual ? (
                      <img src={profile.equipment.manual.icon} alt="Manual" className="w-8 h-8 object-contain" />
                    ) : (
                      <Book className="w-5 h-5 text-stone-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">
                      {profile.equipment.manual ? profile.equipment.manual.name : 'Bí Tịch (Trống)'}
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      {profile.equipment.manual ? `+${profile.equipment.manual.stats.congLucBonus} Công Lực` : 'Chưa trang bị'}
                    </span>
                  </div>
                </div>

                {profile.equipment.manual && (
                  <button
                    onClick={() => handleUnequip('manual')}
                    className="text-[11px] text-stone-400 hover:text-red-400 px-2 py-1 rounded bg-stone-800 transition"
                  >
                    Tháo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Center & Right: Bag Inventory & Item Details */}
          <div className="md:col-span-2 p-4 sm:p-5 overflow-y-auto flex flex-col justify-between bg-stone-900/70">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-400">
                  Túi Đồ ({profile.inventory.length} vật phẩm)
                </span>
              </div>

              {/* Inventory Grid */}
              {profile.inventory.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-sm">
                  Túi đồ hiện đang trống. Hãy làm nhiệm vụ hoặc khiêu chiến quái để thu thập trang bị!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {profile.inventory.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    const isEquipped = item.isEquipped;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex flex-col items-center text-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-400 shadow-wuxia-gold'
                            : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain" />
                          {isEquipped && (
                            <span className="absolute -top-1 -right-1 text-[9px] font-bold px-1 rounded bg-emerald-600 text-stone-950 border border-emerald-300">
                              Đeo
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-stone-200 line-clamp-1">{item.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded border ${getRarityBadge(item.rarity)}`}>
                          {item.rarity === 'legendary' ? 'Truyền Thuyết' : item.rarity === 'epic' ? 'Sử Thi' : item.rarity === 'rare' ? 'Hiếm' : 'Căn Bản'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected Item Detail Panel */}
            {selectedItem && (
              <div className="mt-4 pt-4 border-t border-stone-800 bg-stone-950/90 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedItem.icon}
                    alt={selectedItem.name}
                    className="w-14 h-14 object-contain bg-stone-900 border border-stone-700 rounded-lg p-1"
                  />
                  <div>
                    <h4 className="font-bold text-amber-200 text-sm">{selectedItem.name}</h4>
                    <p className="text-xs text-stone-400 max-w-xs">{selectedItem.description}</p>
                    <div className="flex gap-2 mt-1 text-[11px] font-bold">
                      {selectedItem.stats.atkBonus && (
                        <span className="text-amber-400">+{selectedItem.stats.atkBonus} Tấn Công</span>
                      )}
                      {selectedItem.stats.defBonus && (
                        <span className="text-blue-400">+{selectedItem.stats.defBonus} Phòng Thủ</span>
                      )}
                      {selectedItem.stats.hpBonus && (
                        <span className="text-rose-400">+{selectedItem.stats.hpBonus} Sinh Lực</span>
                      )}
                      {selectedItem.stats.congLucBonus && (
                        <span className="text-yellow-400">+{selectedItem.stats.congLucBonus} Công Lực</span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedItem.slot !== 'loot' && (
                  <button
                    onClick={handleEquip}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs shadow whitespace-nowrap active:scale-95 transition"
                  >
                    {selectedItem.isEquipped ? 'Đổi Vị Trí' : 'Trang Bị Ngay'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
